LootJS.lootTables((event) => {
  const pimaryLootChance = 1.0;
  // 一般末地宝箱
  let table = event.getLootTable("minecraft:chests/end_city_treasure");

  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.01 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("create:creative_blaze_cake"));

  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.003 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("create:creative_motor"));

  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.3 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("createages:andesite_machine").setCount([1, 4]));
  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.3 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("createages:brass_machine").setCount([1, 4]));
  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.3 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("createages:copper_machine").setCount([1, 4]));
  table
    .createPool()
    .when((conditions) => {
      conditions.randomChance(0.3 * pimaryLootChance);
    })
    .addEntry(LootEntry.of("createages:redstone_machine").setCount([1, 4]));
});
