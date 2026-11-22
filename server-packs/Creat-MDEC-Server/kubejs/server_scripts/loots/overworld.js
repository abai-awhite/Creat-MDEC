LootJS.lootTables((event) => {
  let table = event.getLootTable("create_easy_structures:chests/common_chest");
  table.createPool((pool) => {
    pool.when((conditions) => {
      conditions.randomChance(0.08);
    });
    pool.addEntry(LootEntry.of("createages:andesite_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:copper_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:brass_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:redstone_machine").setCount([1, 3]));
  });

  table = event.getLootTable("create_easy_structures:chests/rare_chest");
  table.createPool((pool) => {
    pool.when((conditions) => {
      conditions.randomChance(0.3);
    });
    pool.addEntry(LootEntry.of("createages:andesite_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:copper_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:brass_machine").setCount([1, 3]));
    pool.addEntry(LootEntry.of("createages:redstone_machine").setCount([1, 3]));
  });

  table = event.getLootTable("create_easy_structures:chests/epic_chest");
  table.createPool((pool) => {
    pool.addEntry(LootEntry.of("createages:andesite_machine").setCount([2, 6]));
    pool.addEntry(LootEntry.of("createages:copper_machine").setCount([2, 6]));
    pool.addEntry(LootEntry.of("createages:brass_machine").setCount([2, 6]));
    pool.addEntry(LootEntry.of("createages:redstone_machine").setCount([2, 6]));
  });
});
