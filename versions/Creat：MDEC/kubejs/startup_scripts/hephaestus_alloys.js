// 资产来自TinkersConstruct3
const C6C_NEW_ALLOYS = [
  ['amethyst_bronze', 'Amethyst Bronze', 820],
  ['hepatizon', 'Hepatizon', 1400],
  ['pig_iron', 'Pig Iron', 811]
];

StartupEvents.registry('item', function (event) {
  C6C_NEW_ALLOYS.forEach(function (alloy) {
    event.create(alloy[0] + '_ingot').displayName(alloy[1] + ' Ingot');
    event.create(alloy[0] + '_nugget').displayName(alloy[1] + ' Nugget');
  });
});

StartupEvents.registry('block', function (event) {
  C6C_NEW_ALLOYS.forEach(function (alloy) {
    const block = event.create(alloy[0] + '_block').displayName('Block of ' + alloy[1])
      .soundType('metal').hardness(5).resistance(6).requiresTool(true)
      .tagBlock('minecraft:mineable/pickaxe').tagBlock('minecraft:needs_iron_tool');
    if (alloy[0] === 'pig_iron') {
      block.parentModel('minecraft:block/cube').textures({
        particle: 'kubejs:block/pig_iron_top', down: 'kubejs:block/pig_iron_bottom',
        up: 'kubejs:block/pig_iron_top', north: 'kubejs:block/pig_iron_front',
        east: 'kubejs:block/pig_iron_right', south: 'kubejs:block/pig_iron_back',
        west: 'kubejs:block/pig_iron_left'
      });
    }
  });
});

StartupEvents.registry('fluid', function (event) {
  C6C_NEW_ALLOYS.forEach(function (alloy) {
    event.create('molten_' + alloy[0], 'thick')
      .stillTexture('kubejs:fluid/molten_' + alloy[0] + '_still')
      .flowingTexture('kubejs:fluid/molten_' + alloy[0] + '_flow')
      .type(function (type) { type.temperature(alloy[2]).lightLevel(10); })
      .displayName('Molten ' + alloy[1]);
  });
});
