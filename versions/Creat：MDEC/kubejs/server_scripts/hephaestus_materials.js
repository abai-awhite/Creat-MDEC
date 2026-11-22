const C6C_MATERIAL_PARTS = [
  ['pick_head', 180], ['hammer_head', 720], ['small_axe_head', 180],
  ['broad_axe_head', 720], ['adze_head', 180], ['large_plate', 360],
  ['small_blade', 180], ['large_blade', 720], ['tool_handle', 90],
  ['tough_handle', 270], ['tool_binding', 90], ['tough_binding', 270]
];

function c6cMaterialMelt(event, path, ingredient, fluid, amount, temperature) {
  event.custom({
    type: 'hephaestus:melting', ingredient: ingredient,
    result: { id: fluid, amount: amount },
    fuel: { id: temperature > 1000 ? 'hephaestus:molten_blaze' : 'minecraft:lava', amount: 50 },
    temperature: temperature, time: Math.max(40, Math.ceil(amount / 90) * 100)
  }).id('kubejs:hephaestus/materials/melting/' + path);
}

function c6cMaterialCast(event, path, cast, result, fluid, amount) {
  event.custom({
    type: 'hephaestus:casting_table', cast: { item: cast }, cast_consumed: false,
    fluid: { id: fluid, amount: amount }, result: result,
    cooling_time: Math.max(40, Math.ceil(amount / 90) * 50)
  }).id('kubejs:hephaestus/materials/casting/' + path);
}

function c6cMaterialParts(event, material, fluid, temperature) {
  C6C_MATERIAL_PARTS.forEach(function (part) {
    const name = part[0];
    const amount = part[1];
    const item = 'hephaestus_tools:' + name;
    c6cMaterialCast(event, material + '/' + name, item + '_cast', item, fluid, amount);
    c6cMaterialMelt(event, material + '/' + name, {
      type: 'neoforge:components', items: item,
      components: { 'hephaestus_tools:part_material': 'hephaestus_tools:' + material },
      strict: false
    }, fluid, amount, temperature);
  });
}

function c6cMaterialMetal(event, material, temperature) {
  const fluid = 'kubejs:molten_' + material;
  [['ingot', 'ingots', 90], ['nugget', 'nuggets', 10], ['block', 'storage_blocks', 810]]
    .forEach(function (form) {
      const item = 'kubejs:' + material + '_' + form[0];
      c6cMaterialMelt(event, material + '/' + form[0], { tag: 'c:' + form[1] + '/' + material }, fluid, form[2], temperature);
      if (form[0] === 'block') {
        event.custom({ type: 'hephaestus:casting_basin', input: { id: fluid, amount: 810 }, result: item, time: 200 })
          .id('kubejs:hephaestus/materials/casting/' + material + '/block');
      } else {
        c6cMaterialCast(event, material + '/' + form[0], 'hephaestus:' + form[0] + '_cast', item, fluid, form[2]);
      }
    });
  const base = 'kubejs:' + material;
  event.shapeless(base + '_ingot', ['9x ' + base + '_nugget']).id(base + '/ingot_from_nuggets');
  event.shapeless('9x ' + base + '_nugget', [base + '_ingot']).id(base + '/nuggets');
  event.shapeless(base + '_block', ['9x ' + base + '_ingot']).id(base + '/block');
  event.shapeless('9x ' + base + '_ingot', [base + '_block']).id(base + '/ingots_from_block');
}

function c6cMaterialAlloy(event, material, inputs, amount, temperature) {
  event.custom({
    type: 'hephaestus:alloying',
    inputs: inputs, output: { id: 'kubejs:molten_' + material, amount: amount }, temperature: temperature
  }).id('kubejs:hephaestus/materials/alloying/' + material);
}

ServerEvents.recipes(function (event) {
  c6cMaterialMetal(event, 'manyullyn', 1200);
  c6cMaterialAlloy(event, 'manyullyn', [
    { id: 'hephaestus:molten_cobalt', amount: 270 }, { id: 'hephaestus:molten_ancient_debris', amount: 90 }
  ], 360, 1200);
  c6cMaterialParts(event, 'manyullyn', 'kubejs:molten_manyullyn', 1200);
  c6cMaterialParts(event, 'cobalt', 'hephaestus:molten_cobalt', 950);
  c6cMaterialMelt(event, 'cobalt/ore', { item: 'kubejs:nether_cobalt_ore' }, 'hephaestus:molten_cobalt', 90, 950);
  [['amethyst_bronze', 820], ['hepatizon', 1400], ['pig_iron', 811]].forEach(function (alloy) {
    c6cMaterialMetal(event, alloy[0], alloy[1]);
    c6cMaterialParts(event, alloy[0], 'kubejs:molten_' + alloy[0], alloy[1]);
  });
  c6cMaterialParts(event, 'steel', 'hephaestus:molten_steel', 900);
  // 宝石按匠神的每颗 90 mB 换算；肉液与蜂蜜沿用现有获取路线。
  c6cMaterialAlloy(event, 'amethyst_bronze', [
    { id: 'hephaestus:molten_copper', amount: 90 }, { id: 'hephaestus:molten_amethyst', amount: 90 }
  ], 90, 820);
  c6cMaterialAlloy(event, 'hepatizon', [
    { id: 'hephaestus:molten_copper', amount: 180 }, { id: 'hephaestus:molten_cobalt', amount: 90 },
    { id: 'hephaestus:molten_quartz', amount: 90 }
  ], 180, 1400);
  c6cMaterialAlloy(event, 'pig_iron', [
    { id: 'hephaestus:molten_iron', amount: 90 }, { id: 'hephaestus:molten_meat', amount: 500 },
    { id: 'create:honey', amount: 250 }
  ], 180, 811);
});
