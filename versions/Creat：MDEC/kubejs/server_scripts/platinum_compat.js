// Create Propulsion 铂接入匠神；沿用匠神现有铂材料，不注册重复材料或物品。
const PLATINUM_FLUID = 'hephaestus:molten_platinum';
const PLATINUM_TEMPERATURE = 1768;
const PLATINUM_FUEL_AMOUNT = 50;
const PLATINUM_FORMS = [
  { name: 'ingot', tag: 'ingots/platinum', item: 'platinum_ingot', amount: 90, time: 200, cooling: 100 },
  { name: 'nugget', tag: 'nuggets/platinum', item: 'platinum_nugget', amount: 10, time: 33, cooling: 33 },
  { name: 'block', tag: 'storage_blocks/platinum', item: 'platinum_block', amount: 810, time: 1800, cooling: 200 },
  { name: 'plate', tag: 'plates/platinum', item: 'platinum_sheet', amount: 90, time: 200, cooling: 100 }
];
const PLATINUM_PARTS = [
  { name: 'adze_head', amount: 180, time: 120 },
  { name: 'broad_axe_head', amount: 720, time: 240 },
  { name: 'hammer_head', amount: 720, time: 240 },
  { name: 'large_blade', amount: 720, time: 240 },
  { name: 'large_plate', amount: 360, time: 160 },
  { name: 'pick_head', amount: 180, time: 120 },
  { name: 'small_axe_head', amount: 180, time: 120 },
  { name: 'small_blade', amount: 180, time: 120 },
  { name: 'tool_binding', amount: 90, time: 100 },
  { name: 'tool_handle', amount: 90, time: 100 },
  { name: 'tough_binding', amount: 270, time: 140 },
  { name: 'tough_handle', amount: 270, time: 140 }
];

function platinumMelting(event, path, ingredient, amount, time) {
  event.custom({
    type: 'hephaestus:melting',
    ingredient: ingredient,
    result: { id: PLATINUM_FLUID, amount: amount },
    fuel: { id: 'hephaestus:molten_blaze', amount: PLATINUM_FUEL_AMOUNT },
    temperature: PLATINUM_TEMPERATURE,
    time: time
  }).id('kubejs:hephaestus/platinum/melting/' + path);
}

function platinumCasting(event, path, result, cast, amount, time) {
  event.custom({
    type: 'hephaestus:casting_table',
    cast: { item: cast },
    cast_consumed: false,
    fluid: { id: PLATINUM_FLUID, amount: amount },
    result: result,
    cooling_time: time
  }).id('kubejs:hephaestus/platinum/casting/' + path);
}

function platinumMetalForms(event) {
  PLATINUM_FORMS.forEach(function (form) {
    platinumMelting(event, form.name, { tag: 'c:' + form.tag }, form.amount, form.time);
    if (form.name === 'block') {
      event.custom({
        type: 'hephaestus:casting_basin',
        input: { id: PLATINUM_FLUID, amount: form.amount },
        result: 'createpropulsion:' + form.item,
        time: form.cooling
      }).id('kubejs:hephaestus/platinum/casting/block');
    } else {
      platinumCasting(event, form.name, 'createpropulsion:' + form.item,
        'hephaestus:' + form.name + '_cast', form.amount, form.cooling);
    }
  });
  // 与本包其它粗金属一致：粗矿/粉碎矿 120 mB，粗矿块 1080 mB。
  platinumMelting(event, 'raw', { tag: 'c:raw_materials/platinum' }, 120, 250);
  platinumMelting(event, 'raw_block', { tag: 'c:storage_blocks/raw_platinum' }, 1080, 2250);
  platinumMelting(event, 'crushed', { item: 'create:crushed_raw_platinum' }, 120, 250);
  platinumMelting(event, 'ore', { tag: 'c:ores/platinum' }, 120, 300);
}

function platinumToolParts(event) {
  PLATINUM_PARTS.forEach(function (part) {
    // 原配方只检查 AllTheOres / FTB Materials；改为本包已存在的铂来源。
    event.remove({ id: 'hephaestus_tools:casting/compat/platinum/' + part.name });
    event.remove({ id: 'hephaestus_tools:melting/compat/platinum/' + part.name });
    platinumCasting(event, part.name, 'hephaestus_tools:' + part.name,
      'hephaestus_tools:' + part.name + '_cast', part.amount, part.time);
    platinumMelting(event, part.name, {
      type: 'neoforge:components',
      items: 'hephaestus_tools:' + part.name,
      components: { 'hephaestus_tools:part_material': 'hephaestus_tools:platinum' },
      strict: false
    }, part.amount, part.time);
  });
}

function platinumRemoveMetalConflicts(event) {
  // 明确 ID，不使用动态正则；为今后添加其它矿物模组时避免重复路线。
  PLATINUM_FORMS.forEach(function (form) {
    event.remove({ id: 'hephaestus:smeltery/melting/alltheores_compat/metal/platinum/' + form.name });
    const casting = form.name === 'block' ? 'basin' : 'table';
    const suffix = form.name === 'block' ? 'block' : form.name + '_cast';
    event.remove({ id: 'hephaestus:smeltery/casting/' + casting + '/alltheores_compat/metal/platinum/' + suffix });
  });
  ['raw', 'raw_block'].forEach(function (form) {
    event.remove({ id: 'hephaestus:smeltery/melting/alltheores_compat/metal/platinum/' + form });
  });
}

ServerEvents.recipes(function (event) {
  platinumRemoveMetalConflicts(event);
  platinumMetalForms(event);
  platinumToolParts(event);
});
