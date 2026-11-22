// 注册内容留在整合包，战斗特性由 C6C 的事件处理实现。
StartupEvents.registry('item', function (event) {
  event.create('manyullyn_ingot').displayName('Manyullyn Ingot');
  event.create('manyullyn_nugget').displayName('Manyullyn Nugget');
  event.create('crushed_raw_cobalt').displayName('Crushed Cobalt Ore');
});

StartupEvents.registry('block', function (event) {
  event.create('manyullyn_block').displayName('Block of Manyullyn')
    .soundType('metal').hardness(5).resistance(6).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_diamond_tool');
  event.create('nether_cobalt_ore').displayName('Nether Cobalt Ore')
    .soundType('nether_ore').hardness(10).resistance(6).requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_iron_tool');
});

StartupEvents.registry('fluid', function (event) {
  event.create('molten_manyullyn', 'thick')
    .stillTexture('kubejs:fluid/molten_manyullyn_still')
    .flowingTexture('kubejs:fluid/molten_manyullyn_flow')
    .type(function (type) { type.temperature(1200).lightLevel(10); })
    .displayName('Molten Manyullyn');
});
