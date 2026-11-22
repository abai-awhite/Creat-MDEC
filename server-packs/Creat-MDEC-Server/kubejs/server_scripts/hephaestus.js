// 金属计量：1 粒 = 10 mB，1 锭 = 90 mB，1 块 = 810 mB。
const HEPH_UNITS = { nugget: 10, ingot: 90, block: 810, plate: 90, raw: 120 };
const HEPH_TIMES = { nugget: 33, ingot: 200, block: 1800, plate: 200 };
const HEPH_TAGS = { nugget: 'nuggets', ingot: 'ingots', block: 'storage_blocks', plate: 'plates' };
const HEPH_LAVA = 'minecraft:lava';
const HEPH_BLAZE = 'hephaestus:molten_blaze';
const HEPH_METALS = [
  { name: 'iron', ingot: 'minecraft:iron_ingot', nugget: 'minecraft:iron_nugget',
    block: 'minecraft:iron_block', plate: 'create:iron_sheet', raw: true },
  { name: 'copper', ingot: 'minecraft:copper_ingot', nugget: 'create:copper_nugget',
    block: 'minecraft:copper_block', plate: 'create:copper_sheet', raw: true },
  { name: 'gold', ingot: 'minecraft:gold_ingot', nugget: 'minecraft:gold_nugget',
    block: 'minecraft:gold_block', plate: 'create:golden_sheet', raw: true },
  { name: 'zinc', ingot: 'create:zinc_ingot', nugget: 'create:zinc_nugget',
    block: 'create:zinc_block', plate: 'createdeco:zinc_sheet', raw: true },
  { name: 'brass', ingot: 'create:brass_ingot', nugget: 'create:brass_nugget',
    block: 'create:brass_block', plate: 'create:brass_sheet' },
  { name: 'bronze', ingot: 'createbigcannons:bronze_ingot', nugget: 'createbigcannons:bronze_scrap',
    block: 'createbigcannons:bronze_block', temperature: 950 },
  { name: 'steel', ingot: 'createbigcannons:steel_ingot', nugget: 'createbigcannons:steel_scrap',
    block: 'createbigcannons:steel_block' },
  { name: 'cast_iron', ingot: 'createbigcannons:cast_iron_ingot', nugget: 'createbigcannons:cast_iron_nugget',
    block: 'createbigcannons:cast_iron_block', fluid: 'createbigcannons:molten_cast_iron' },
  { name: 'nethersteel', ingot: 'createbigcannons:nethersteel_ingot', nugget: 'createbigcannons:nethersteel_nugget',
    block: 'createbigcannons:nethersteel_block', fluid: 'createbigcannons:molten_nethersteel',
    temperature: 2000, fuel: HEPH_BLAZE },
  { name: 'netherite', ingot: 'minecraft:netherite_ingot', block: 'minecraft:netherite_block',
    temperature: 2000, fuel: HEPH_BLAZE }
];

function hephFluid(metal) {
  return metal.fluid || 'hephaestus:molten_' + metal.name;
}

function hephMelting(event, path, ingredient, fluid, amount, temperature, time, fuel) {
  event.custom({
    type: 'hephaestus:melting',
    ingredient: ingredient,
    result: { id: fluid, amount: amount },
    fuel: { id: fuel || HEPH_LAVA, amount: 50 },
    temperature: temperature,
    time: time
  }).id('kubejs:hephaestus/melting/' + path);
}

function hephTable(event, path, fluid, amount, result, cast, time) {
  event.custom({
    type: 'hephaestus:casting_table',
    cast: { item: 'hephaestus:' + cast + '_cast' },
    cast_consumed: false,
    fluid: { id: fluid, amount: amount },
    result: result,
    cooling_time: time
  }).id('kubejs:hephaestus/casting/' + path);
}

function hephMetalForms(event, metal) {
  Object.keys(HEPH_TAGS).forEach(function (form) {
    if (!metal[form]) return;
    const fluid = hephFluid(metal);
    const amount = HEPH_UNITS[form];
    const path = metal.name + '/' + form;
    hephMelting(event, path, { tag: 'c:' + HEPH_TAGS[form] + '/' + metal.name },
      fluid, amount, metal.temperature || 900, HEPH_TIMES[form], metal.fuel);
    if (form === 'block') {
      event.custom({
        type: 'hephaestus:casting_basin', input: { id: fluid, amount: amount },
        result: metal.block, time: 200
      }).id('kubejs:hephaestus/casting/' + path);
    } else {
      hephTable(event, path, fluid, amount, metal[form], form, form === 'nugget' ? 33 : 100);
    }
  });
}

function hephRawMetal(event, metal) {
  if (!metal.raw) return;
  const fluid = hephFluid(metal);
  hephMelting(event, metal.name + '/raw', { tag: 'c:raw_materials/' + metal.name },
    fluid, HEPH_UNITS.raw, 900, 250);
  hephMelting(event, metal.name + '/raw_block', { tag: 'c:storage_blocks/raw_' + metal.name },
    fluid, HEPH_UNITS.raw * 9, 900, 2250);
  hephMelting(event, metal.name + '/crushed', { item: 'create:crushed_raw_' + metal.name },
    fluid, HEPH_UNITS.raw, 900, 250);
}

function hephSpecialMelting(event) {
  // electroenergetics 线材已随该 mod 移除，相关熔化配方取消。
  hephMelting(event, 'ancient_debris/raw', { item: 'minecraft:ancient_debris' },
    'hephaestus:molten_ancient_debris', 120, 2000, 300, HEPH_BLAZE);
  hephMelting(event, 'ancient_debris/scrap', { item: 'minecraft:netherite_scrap' },
    'hephaestus:molten_ancient_debris', 90, 2000, 200, HEPH_BLAZE);
}

function hephAlloys(event) {
  // 将默认 100 mB 批量改成整锭批量，铜锌 1:1 的产率不变。
  event.custom({
    type: 'hephaestus:alloying',
    inputs: [
      { id: 'hephaestus:molten_copper', amount: 90 },
      { id: 'hephaestus:molten_zinc', amount: 90 }
    ],
    output: { id: 'hephaestus:molten_brass', amount: 180 },
    temperature: 650
  }).id('kubejs:hephaestus/alloying/brass');
  // 保留 CBC 原钢配方的材料成本：2 铁 + 1 煤 -> 2 钢。
  event.custom({
    type: 'hephaestus:alloying',
    inputs: [
      { id: 'hephaestus:molten_iron', amount: 180 },
      { id: 'hephaestus:molten_carbon', amount: 90 }
    ],
    output: { id: 'hephaestus:molten_steel', amount: 180 },
    temperature: 1000
  }).id('kubejs:hephaestus/alloying/steel');
  // 无需中间粉末；1 份下界残骸 + 8 锭钢 -> 9 锭下界钢，流体体积守恒。
  event.custom({
    type: 'hephaestus:alloying',
    inputs: [
      { id: 'hephaestus:molten_ancient_debris', amount: 90 },
      { id: 'hephaestus:molten_steel', amount: 720 }
    ],
    output: { id: 'createbigcannons:molten_nethersteel', amount: 810 },
    temperature: 2000
  }).id('kubejs:hephaestus/alloying/nethersteel');
}

function hephRemoveNativeMetalRecipes(event, metal) {
  // 使用明确 ID，避免 KubeJS 对带斜杠的动态正则解析出错。
  const forms = ['block', 'ingot', 'nugget', 'plate'];
  if (metal.raw) forms.push('raw', 'raw_block');
  ['', 'alltheores_compat/', 'ftbmaterials_compat/'].forEach(function (compat) {
    const path = compat + 'metal/' + metal.name + '/';
    forms.forEach(function (form) {
      event.remove({ id: 'hephaestus:smeltery/melting/' + path + form });
    });
    ['block', 'block_cast'].forEach(function (form) {
      event.remove({ id: 'hephaestus:smeltery/casting/basin/' + path + form });
    });
    ['ingot_cast', 'nugget_cast', 'plate_cast'].forEach(function (form) {
      event.remove({ id: 'hephaestus:smeltery/casting/table/' + path + form });
    });
  });
}

function hephRemoveConflicts(event) {
  // 精确替换基础形态；保留工具/护甲回收、工具部件浇铸和其他金属。
  HEPH_METALS.forEach(function (metal) { hephRemoveNativeMetalRecipes(event, metal); });
  [
    'hephaestus:smeltery/melting/misc/ancient_debris',
    'hephaestus:smeltery/melting/misc/ancient_debris_from_scrap',
    'hephaestus:smeltery/melting/misc/netherite_from_ingot',
    'hephaestus:smeltery/alloying/brass',
    // 默认低成本下界合金合成会绕过本包的 Alloy Smelter 路线。
    'hephaestus:smeltery/alloying/netherite',
    'createbigcannons:mixing/alloy_steel',
    'createbigcannons:mixing/alloy_nethersteel_cast_iron',
    'createbigcannons:mixing/alloy_nethersteel_steel'
  ].forEach(function (id) { event.remove({ id: id }); });
  // CBC 全部熔化配方统一迁到匠神；不影响 CBC 专用炮件铸造类型。
  event.remove({ type: 'createbigcannons:melting' });
  ['bronze', 'cast_iron', 'steel', 'nethersteel'].forEach(function (metal) {
    ['block', 'ingot', 'nugget'].forEach(function (form) {
      event.remove({ id: 'createbigcannons:compacting/forge_' + metal + '_' + form });
    });
  });
  // 青铜和铸铁上游暂不改动，待决定无锡青铜的设计后再处理。
}

ServerEvents.recipes(function (event) {
  hephRemoveConflicts(event);
  HEPH_METALS.forEach(function (metal) {
    hephMetalForms(event, metal);
    hephRawMetal(event, metal);
  });
  hephSpecialMelting(event);
  hephAlloys(event);
});
