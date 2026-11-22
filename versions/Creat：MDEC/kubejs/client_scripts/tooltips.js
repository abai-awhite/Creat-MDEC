let $DataComponentType = Java.loadClass(
  "net.minecraft.core.component.DataComponentType"
);
ItemEvents.modifyTooltips((event) => {
  event.add("hotbath:hot_water_bucket", {
    translate: "kubejs.tooltips.hot_water_bucket",
  });

  event.add(
    [
      'fxntstorage:passer_block',
      'fxntstorage:smart_passer_block',
      'fxntstorage:backpack_crafting_upgrade',
      'fxntstorage:backpack_workshop_upgrade',
    ],
    {
      translate: "kubejs.tooltips.banned",
    }
  );

  event.add("hotbath:hot_water_bucket", {
    translate: "kubejs.tooltips.hot_water_bucket",
  });

  event.add('create:creative_blaze_cake', {
    translate: "kubejs.tooltips.once_use",
  });

  event.add('createdieselgenerators:oil_scanner', Text.of({
    translate: "kubejs.tooltips.oil_scanner",
  }).lightPurple());
  event.add('createdieselgenerators:oil_scanner', Text.of({
    translate: "kubejs.tooltips.oil_scanner2",
  }).lightPurple());
  event.add('createdieselgenerators:oil_scanner', Text.of({
    translate: "kubejs.tooltips.oil_scanner3",
  }));
});
