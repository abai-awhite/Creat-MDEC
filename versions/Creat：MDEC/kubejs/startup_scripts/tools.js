ItemEvents.modification((event) => {
  event.modify('takesapillage:ravager_horn', item => {
    item.maxDamage = 16
  })
  event.modify('minecraft:totem_of_undying', item => {
    item.maxStackSize = 16
  })
});
