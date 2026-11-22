ServerEvents.recipes((event) => {
  event.shaped("minecraft:elytra", ["CCC", "ADA", "HHH"], {
    A: 'minecraft:potion[potion_contents={potion:"apothic_attributes:extra_long_flying"}]',
    D: "minecraft:dragon_head",
    C: "minecraft:shulker_shell",
    H: "minecraft:phantom_membrane",
  });

  event.remove({ id: "createdeco:pressing/netherite_sheet" });
  event.remove({ id: "createdieselgenerators:crushing/wood_chip_barrels" });
  event.remove({ id: "fxntstorage:crafting_shaped/passer_block" });
  event.remove({ id: "fxntstorage:crafting_shaped/smart_passer_block" });
  event.remove({ id: "fxntstorage:crafting_shaped/backpack_upgrade/backpack_workshop_upgrade" });
  event.remove({ id: "fxntstorage:crafting_shaped/backpack_upgrade/backpack_crafting_upgrade" });
  event.remove({ id: "hotbath:hot_water_bucket" });

  event.shapeless("takesapillage:ravager_horn", [
    "minecraft:ominous_bottle",
    "minecraft:goat_horn",
  ]);

  event.shapeless("kubejs:compressed_tuff", ["9x minecraft:tuff"]);

  event.shapeless("9x minecraft:tuff", ["kubejs:compressed_tuff"]);

});
