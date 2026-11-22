# CDR 脚本移植清单

- 生成时间：2026-11-22T09:37:55.102Z
- 源：versions\Create-Delight-Remake\kubejs（490 个脚本）
- 目标：versions\Creat：MDEC\kubejs
- 备份：_work\kubejs-before-cdr-port-*.zip
- 二轮剔除文件：_work\cdr-scripts-rejected\
- 统计：搬入 82（含 3 个 00_java_classes 安全化改造）/ 跳过 389 / 剔除 15

| 文件 | 状态 | 原因 |
|---|---|---|
| client_scripts/00_java_classes.js | 剔除 | 二轮过滤 |
| client_scripts/JEI.js | 跳过 | 缺 mod: tetra,createdelight,more_mod_tetra |
| client_scripts/Northstar/virtual_satellite_navigation.js | 未搬 | 待查 |
| client_scripts/bug_fix.js | 跳过 | 缺 mod: alexsmobs |
| client_scripts/crop_tooltip.js | 搬入 ✓ |  |
| client_scripts/info.js | 跳过 | 缺 mod: createdelightcore |
| client_scripts/key.js | 搬入 ✓ |  |
| client_scripts/network.js | 搬入 ✓ |  |
| client_scripts/order/order.js | 跳过 | 缺 mod: lightmanscurrency,createdelight |
| client_scripts/order/supply_commission.js | 跳过 | 缺 mod: createdelightcore |
| client_scripts/ponder/scene/ae2/annihilation_plane.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/budding_quartz.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/cable.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/controller.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/crafting_process_unit.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/crafting_system.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/formation_plane.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/import_export_bus.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/interface.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/io_port.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/molecular_assembler.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/pattern_provider.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/quantum_network_bridge.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/ae2/storage_bus.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/create.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/scene/mbd2/alloy_electric_furnace.js | 跳过 | 缺 mod: createdelight,createmetallurgy |
| client_scripts/ponder/scene/mbd2/big_centrifuge.js | 跳过 | 缺 mod: createdelight,createdelightcore,createmetallurgy |
| client_scripts/ponder/scene/mbd2/butchery_room.js | 跳过 | 缺 mod: createdelight,butchercraft |
| client_scripts/ponder/scene/mbd2/fission_reactor.js | 跳过 | 缺 mod: createdelight,create_new_age,alexscaves |
| client_scripts/ponder/scene/mbd2/hydropower_station.js | 跳过 | 缺 mod: createdelight,netherexp |
| client_scripts/ponder/tag/ae2/ponder_tag.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/tag/multiblock.js | 跳过 | 缺 mod: createdelight |
| client_scripts/ponder/tag/remove.js | 跳过 | 缺 mod: createnewage |
| client_scripts/render/herbal_cookie.js | 跳过 | 缺 mod: cosmopolitan,createdelight |
| client_scripts/render/infinity_cell.js | 跳过 | 缺 mod: expatternprovider |
| client_scripts/render/render_difficulty_gui.js | 跳过 | 缺 mod: createdelightcore |
| client_scripts/render/render_item_energy_bar.js | 跳过 | 缺 mod: tetra |
| client_scripts/tool_tip.js | 跳过 | 缺 mod: dreadsteel,createaddition,ratatouille,createdelightcore,createdelight |
| client_scripts/utils/ponder.js | 搬入 ✓ |  |
| client_scripts/utils/tetra.js | 剔除 | 二轮过滤 |
| client_scripts/utils/tool_tips.js | 搬入 ✓ |  |
| server_scripts/00_java_classes.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/AE Omnicells/recipes.js | 跳过 | 缺 mod: createutilities,createdelight |
| server_scripts/AE2/budding_quartz.js | 搬入 ✓ |  |
| server_scripts/AE2/component.js | 跳过 | 缺 mod: createdelight |
| server_scripts/AE2/infinity_cell.js | 跳过 | 缺 mod: createdelight,alexscaves,vintageimprovements,ratatouille,createmetallurgy |
| server_scripts/AE2/loot.js | 搬入 ✓ |  |
| server_scripts/AE2/machine.js | 跳过 | Northstar 已删 |
| server_scripts/AE2/material.js | 跳过 | Northstar 已删 |
| server_scripts/AE2/processor&cellcasing.js | 跳过 | 缺 mod: createdelight,expatternprovider,createutilities,iceandfire,createmetallurgy |
| server_scripts/AE2/tags.js | 跳过 | 缺 mod: vintageimprovements,createdelight,farmersrespite,collectorsreap |
| server_scripts/AE2/tool&stuff.js | 跳过 | 缺 mod: createdelight,expatternprovider,cobblefordays |
| server_scripts/Alex's Cave/Biology.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Alex's Cave/candy.js | 跳过 | 缺 mod: alexscaves,create_oppenheimered,createdelight,cosmopolitan,create_deepfried |
| server_scripts/Alex's Cave/loot.js | 跳过 | 缺 mod: alexscaves,createdelight,createdelightcore |
| server_scripts/Alex's Cave/magnetic_cave.js | 跳过 | 缺 mod: alexscaves,vintageimprovements,createdelight,create_new_age,createdelightcore |
| server_scripts/Alex's Cave/portal.js | 跳过 | 缺 mod: create_new_age,alexscaves |
| server_scripts/Alex's Cave/recipes.js | 跳过 | 缺 mod: create_oppenheimered,alexscaves,cavedelight,createdelight |
| server_scripts/Alex's Cave/tags.js | 跳过 | 缺 mod: alexscaves,iceandfire,createdelight,butchercraft,create_new_age |
| server_scripts/Alex's Cave/toxic_caves.js | 跳过 | Northstar 已删 |
| server_scripts/Alex's Mobs/prevent_summon.js | 跳过 | 缺 mod: alexsmobs |
| server_scripts/Alex's Mobs/recipe.js | 跳过 | 缺 mod: alexsmobs,festival_delicacies,createdelight,createdelightcore,some_assembly_required |
| server_scripts/Alex's Mobs/summon.js | 跳过 | 缺 mod: createdelightcore,alexsmobs |
| server_scripts/Applied Create/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Bakeries/misc.js | 跳过 | 缺 mod: bakeries,createdelight,ratatouille |
| server_scripts/Bakeries/recipe.js | 跳过 | 缺 mod: bakeries,vintagedelight,createdelight,ratatouille,frycooks_delight |
| server_scripts/Bakeries/tags.js | 跳过 | 缺 mod: bakeries,some_assembly_required |
| server_scripts/Bakeries/trade.js | 跳过 | 缺 mod: bakeries,createdelight,createdelightcore,cosmopolitan |
| server_scripts/Better Combat/network.js | 搬入 ✓ |  |
| server_scripts/Black Knight Armor/recipes.js | 跳过 | 缺 mod: blackknightarmor,dreadsteel,alexscaves,netherexp,createdelight |
| server_scripts/Bountiful/recipe.js | 跳过 | 缺 mod: lightmanscurrency |
| server_scripts/Brewin and Chewin/recipe.js | 跳过 | 缺 mod: vintagedelight,cosmopolitan,create_bic_bit,createdelight,farmersrespite |
| server_scripts/Brewin and Chewin/tags.js | 跳过 | 缺 mod: ratatouille,cmr |
| server_scripts/Brewin and Chewin/util.js | 搬入 ✓ |  |
| server_scripts/Butchercraft/bug_fix.js | 跳过 | 缺 mod: butchercraft,createdelight |
| server_scripts/Butchercraft/food.js | 跳过 | 缺 mod: butchercraft,createdelight,festival_delicacies,vintagedelight |
| server_scripts/Butchercraft/recipes.js | 跳过 | 缺 mod: createdelight,butchercraft,ratatouille |
| server_scripts/Butchercraft/tags.js | 跳过 | 缺 mod: butchercraft |
| server_scripts/Casualness Delight/bug_fix.js | 跳过 | 缺 mod: casualness_delight |
| server_scripts/Casualness Delight/cheese.js | 跳过 | 缺 mod: vintagedelight,casualness_delight,create_bic_bit,createdelight |
| server_scripts/Casualness Delight/frying.js | 跳过 | 缺 mod: casualness_delight,createdelight,butchercraft,create_deepfried,cosmopolitan |
| server_scripts/Casualness Delight/recipes.js | 跳过 | 缺 mod: casualness_delight,createdelight |
| server_scripts/Cave Delight/recipe.js | 跳过 | 缺 mod: cavedelight,alexscaves,farmersrespite,bakeries,createdelight |
| server_scripts/Cobble for Days/recipes.js | 搬入 ✓ |  |
| server_scripts/Collectors Reap/recipes.js | 跳过 | 缺 mod: bakeries,createdelight,collectorsreap,oceanic_delight,seasonals |
| server_scripts/Collectors Reap/tags.js | 跳过 | 缺 mod: collectorsreap |
| server_scripts/Corn Delight/recipe.js | 搬入 ✓ |  |
| server_scripts/Cosmopolitan/recipe.js | 跳过 | 缺 mod: cosmopolitan,collectorsreap,createdelightcore,createdelight,alexscaves |
| server_scripts/Cosmopolitan/tags.js | 跳过 | 缺 mod: cosmopolitan,ratatouille,iceandfire,cmr,createdelight |
| server_scripts/Crabbers Delight/lobster&crab.js | 跳过 | 缺 mod: alexsmobs,oceanic_delight,alexscaves,createdelight |
| server_scripts/Crabbers Delight/loot.js | 跳过 | 缺 mod: alexsmobs |
| server_scripts/Crabbers Delight/recipes.js | 搬入 ✓ |  |
| server_scripts/Crate Delight/recipe.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Addition/blaze_burner_fuel.js | 跳过 | 缺 mod: createaddition |
| server_scripts/Create Addition/loot.js | 跳过 | 缺 mod: createaddition |
| server_scripts/Create Addition/recipes.js | 跳过 | 缺 mod: createaddition,createdelight,create_sa,vvaddon |
| server_scripts/Create Addition/tags.js | 跳过 | 缺 mod: createaddition,vintageimprovements,iceandfire |
| server_scripts/Create Additional Logistics/recipe.js | 搬入 ✓ |  |
| server_scripts/Create Better Storage/recipe.js | 跳过 | 缺 mod: createdelight,create_bs |
| server_scripts/Create BitterBallen/recipe.js | 跳过 | 缺 mod: create_bic_bit,create_deepfried,bakeries,createdelight,vintagedelight |
| server_scripts/Create Cafe/big_fix.js | 跳过 | 缺 mod: bakeries,ratatouille,createdelight |
| server_scripts/Create Cafe/loot.js | 搬入 ✓ |  |
| server_scripts/Create Cafe/recipe.js | 跳过 | 缺 mod: createdelight,createdelightcore,bakeries,cosmopolitan,createaddition |
| server_scripts/Create Cafe/tags.js | 跳过 | 缺 mod: createdelight,collectorsreap,createdelightcore,cosmopolitan |
| server_scripts/Create Central Kitchen/recipes.js | 跳过 | 缺 mod: createdelight,cosmopolitan |
| server_scripts/Create Central Kitchen/tag.js | 跳过 | 缺 mod: quality_food_fluids |
| server_scripts/Create Confectionery/caramel.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Confectionery/recipe.js | 跳过 | 缺 mod: bakeries,createdelight |
| server_scripts/Create Confectionery/remove.js | 搬入 ✓ |  |
| server_scripts/Create Confectionery/tags.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Connected/recipes.js | 跳过 | 缺 mod: createaddition,createdelight_connected,vintageimprovements,createdelight |
| server_scripts/Create Connected/tags.js | 搬入 ✓ |  |
| server_scripts/Create Deco/remove.js | 跳过 | 缺 mod: createaddition,vintageimprovements,createdelightdeco |
| server_scripts/Create Deco/tag.js | 搬入 ✓ |  |
| server_scripts/Create Delight/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Create Delight/tag.js | 跳过 | 缺 mod: createdelightcore,createdelight,iceandfire |
| server_scripts/Create Diesel Generators/bug_fix.js | 搬入 ✓ |  |
| server_scripts/Create Diesel Generators/recipes.js | 跳过 | 缺 mod: iceandfire,netherexp,cosmopolitan,vintagedelight,createdelight |
| server_scripts/Create Diesel Generators/tags.js | 跳过 | Northstar 已删 |
| server_scripts/Create Enchant Industry/recipe.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Fantasizing/recipe.js | 跳过 | 缺 mod: create_fantasizing,alexscaves,create_sa,createdelight |
| server_scripts/Create Fluid Logistics/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Create Fluid Stuffs/recipe.js | 跳过 | 缺 mod: createfluidstuffs |
| server_scripts/Create Integrated Farming/recipe.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Jetpack/recipes.js | 跳过 | 缺 mod: create_sa,createdelight |
| server_scripts/Create Metallurgy/melting_block.js | 跳过 | 缺 mod: createmetallurgy |
| server_scripts/Create Metallurgy/recipe.js | 跳过 | 缺 mod: createmetallurgy,createaddition,createdelight,createdelightcore,iceandfire |
| server_scripts/Create Mob Spawners/recipes.js | 跳过 | 缺 mod: create_mob_spawners,vintageimprovements,alexscaves,createdelight,createdelightcore |
| server_scripts/Create More Recipe/recipe.js | 跳过 | 缺 mod: cmr,createdelight,netherexp |
| server_scripts/Create New Age/energising.js | 跳过 | 缺 mod: create_new_age,createaddition,createdelight,vintageimprovements,alexscaves |
| server_scripts/Create New Age/magnet.js | 跳过 | 缺 mod: create_new_age,alexscaves,createdelight,createmetallurgy,createdelightcore |
| server_scripts/Create New Age/motor.js | 跳过 | 缺 mod: create_new_age,createmetallurgy,vvaddon,createdelight,createaddition |
| server_scripts/Create New Age/nuclear.js | 跳过 | Northstar 已删 |
| server_scripts/Create New Age/tags.js | 跳过 | 缺 mod: create_new_age,alexscaves,createaddition,createdelightcore |
| server_scripts/Create Northstar/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Create Northstar/tag.js | 跳过 | Northstar 已删 |
| server_scripts/Create Ore/cluster.js | 跳过 | Northstar 已删 |
| server_scripts/Create Ore/finder_overworld.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Ore/fluid.js | 跳过 | 缺 mod: ratatouille,createdelight,alexscaves |
| server_scripts/Create Ore/ore.js | 跳过 | Northstar 已删 |
| server_scripts/Create Ore/ore_digging.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Ore/recipes.js | 跳过 | Northstar 已删 |
| server_scripts/Create Ore/tags.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Create Solar Powered/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Create Staff & Addition/recipes.js | 跳过 | 缺 mod: create_sa,create_new_age,createdelight_sa,createmetallurgy,createdelight |
| server_scripts/Create Staff & Addition/tags.js | 跳过 | 缺 mod: create_sa,craete_sa,createdelight |
| server_scripts/Create Utilities/recipes.js | 跳过 | 缺 mod: createutilities,createmetallurgy,createdelight,createaddition |
| server_scripts/Create Utilities/tags.js | 跳过 | 缺 mod: createutilities |
| server_scripts/Create vintage improvements/recipes.js | 跳过 | 缺 mod: vintageimprovements,createdelight,createutilities,createaddition |
| server_scripts/Create vintage improvements/spring_tags.js | 跳过 | 缺 mod: vintageimprovements |
| server_scripts/Create/blaze_cake.js | 搬入 ✓ |  |
| server_scripts/Create/bug_fix.js | 跳过 | 缺 mod: alexsmobs |
| server_scripts/Create/configuration_module_recipes.js | 跳过 | 缺 mod: createdelightcore,createdelight |
| server_scripts/Create/machine_engine_test_recipes.js | 跳过 | 缺 mod: createdelight,create_sa,vintageimprovements,createmetallurgy,ratatouille |
| server_scripts/Create/metallurgy.js | 跳过 | 缺 mod: createdelight,vintageimprovements,createdelightcore,createmetallurgy |
| server_scripts/Create/recipes.js | 跳过 | 缺 mod: create_new_age,createutilities,createaddition,create_oppenheimered,createdelight |
| server_scripts/Create/tags.js | 跳过 | 缺 mod: create_bs,ratatouille,createdelight,vintageimprovements,netherexp |
| server_scripts/Cultural Delights/corn.js | 跳过 | 缺 mod: vintagedelight,createdelight,createaddition |
| server_scripts/Cultural Delights/recipes.js | 跳过 | 缺 mod: createdelight,vintagedelight |
| server_scripts/Curios/util.js | 搬入 ✓ |  |
| server_scripts/Custom/air_armors.js | 剔除 | 二轮过滤 |
| server_scripts/Custom/break_efficiency.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Custom/command.js | 跳过 | 缺 mod: tetra |
| server_scripts/Custom/encase.js | 搬入 ✓ |  |
| server_scripts/Custom/event.js | 搬入 ✓ |  |
| server_scripts/Custom/export_food.js | 搬入 ✓ |  |
| server_scripts/Custom/fluid_transporter.js | 跳过 | 缺 mod: fluid_transporter,create_sa,createmetallurgy,createdelight |
| server_scripts/Custom/food/butter.js | 跳过 | 缺 mod: cosmopolitan,butchercraft,createdelight,createdelightcore |
| server_scripts/Custom/food/chips.js | 跳过 | 缺 mod: casualness_delight,create_bic_bit,cosmopolitan |
| server_scripts/Custom/food/cookie.js | 跳过 | 缺 mod: vintagedelight,farmersrespite,miners_delight,cosmopolitan,cavedelight |
| server_scripts/Custom/food/icecream.js | 跳过 | 缺 mod: alexscaves,cosmopolitan,createdelightcore,createdelight,collectorsreap |
| server_scripts/Custom/food/muffin.js | 跳过 | 缺 mod: seasonals,bakeries,createdelight |
| server_scripts/Custom/food/pizza.js | 跳过 | 缺 mod: createdelightcore,bakeries,create_bic_bit,netherexp |
| server_scripts/Custom/food/popsicle.js | 跳过 | 缺 mod: ratatouille,createdelight,cosmopolitan,youkaishomecoming,collectorsreap |
| server_scripts/Custom/food/roll.js | 跳过 | 缺 mod: createdelight,youkaishomecoming,silentsdelight,oceanic_delight,alexscaves |
| server_scripts/Custom/food/vermicelli&board.js | 跳过 | 缺 mod: createdelight,bakeries,butchercraft,casualness_delight |
| server_scripts/Custom/hellow.js | 搬入 ✓ |  |
| server_scripts/Custom/leather.js | 跳过 | 缺 mod: createdelight,createdelightcore |
| server_scripts/Custom/metal/andesite.js | 跳过 | 缺 mod: createdelight,createdelightcore |
| server_scripts/Custom/metal/bronze.js | 跳过 | 缺 mod: createdelightcore |
| server_scripts/Custom/metal/tin.js | 跳过 | 缺 mod: createdelightcore |
| server_scripts/Custom/misc.js | 跳过 | 缺 mod: createdelight,alexscaves |
| server_scripts/Custom/multiblock.js | 跳过 | Northstar 已删 |
| server_scripts/Custom/order/commands.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Custom/order/event.js | 搬入 ✓ |  |
| server_scripts/Custom/order/system.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Custom/paper.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Custom/pipe.js | 搬入 ✓ |  |
| server_scripts/Custom/remove.js | 跳过 | 缺 mod: createmetallurgy |
| server_scripts/Custom/slime.js | 跳过 | 缺 mod: ratatouille,createdelightcore,createdelight |
| server_scripts/Custom/tags.js | 跳过 | 缺 mod: createdelight,iceandfire,alexscaves,alexsmobs,cosmopolitan |
| server_scripts/Custom/unified_loot.js | 跳过 | Northstar 已删 |
| server_scripts/Custom/vanilla.js | 跳过 | 缺 mod: cosmopolitan,createdelight,createmetallurgy,create_new_age,createdelightcore |
| server_scripts/Debug/Debug.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Debug/Or_debug_boss.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Deeper Darker/loot.js | 跳过 | 缺 mod: silentsdelight |
| server_scripts/Deeper Darker/recipes.js | 搬入 ✓ |  |
| server_scripts/Design Decor/recipes.js | 跳过 | 缺 mod: design_decor |
| server_scripts/Display Delight/tags.js | 搬入 ✓ |  |
| server_scripts/Dungeons Delight/misc.js | 搬入 ✓ |  |
| server_scripts/Dungeons Delight/recipe.js | 跳过 | 缺 mod: cosmopolitan,createdelight,ratatouille,createdelightcore |
| server_scripts/Dungeons Delight/tag.js | 跳过 | 缺 mod: createdelight,miners_delight |
| server_scripts/Ecliptic Seasons/player.js | 搬入 ✓ |  |
| server_scripts/Ecliptic Seasons/recipes.js | 跳过 | 缺 mod: createdelight,cmr |
| server_scripts/Ecliptic Seasons/serene_season_tags.js | 跳过 | 缺 mod: sereneseasons,miners_delight,alexscaves,frycooks_delight,vintagedelight |
| server_scripts/Ecliptic Seasons/tags.js | 跳过 | 缺 mod: frycooks_delight,collectorsreap,vintagedelight,festival_delicacies,createdelight |
| server_scripts/End's Delight/chorus_cooldown.js | 跳过 | 缺 mod: createdelight |
| server_scripts/End's Delight/recipes.js | 跳过 | 缺 mod: createdelight,farmersrespite,ratatouille |
| server_scripts/End's Delight/tags.js | 跳过 | 缺 mod: iceandfire |
| server_scripts/Every X hotpot/recipes.js | 跳过 | 缺 mod: everyxhotpot,festival_delicacies,vintagedelight |
| server_scripts/ExtendedAE Plus/recipe.js | 搬入 ✓ |  |
| server_scripts/FTB Quest/event.js | 搬入 ✓ |  |
| server_scripts/Farmer Delight/assembly_line.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Farmer Delight/bug_fix.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Farmer Delight/compostable.js | 跳过 | 缺 mod: createdelight,festival_delicacies |
| server_scripts/Farmer Delight/pie.js | 跳过 | 缺 mod: createdelight,bakeries,silentsdelight,farmersrespite,casualness_delight |
| server_scripts/Farmer Delight/recipes.js | 跳过 | 缺 mod: tetracelium,youkaishomecoming,oceanic_delight,collectorsreap,alexsmobs |
| server_scripts/Farmer Delight/some_tags.js | 跳过 | 缺 mod: festival_delicacies,createdelight,alexsmobs,silentsdelight,casualness_delight |
| server_scripts/Farmer Delight/trade.js | 跳过 | 缺 mod: createdelightcore |
| server_scripts/Farmers Respite/coffee.js | 跳过 | 缺 mod: farmersrespite,createdelight |
| server_scripts/Farmers Respite/compat.js | 跳过 | 缺 mod: farmersrespite,createdelight |
| server_scripts/Farmers Respite/milk_tea.js | 跳过 | 缺 mod: farmersrespite |
| server_scripts/Farmers Respite/tea.js | 跳过 | 缺 mod: farmersrespite,createdelight |
| server_scripts/Festival Delicacies/compat.js | 跳过 | 缺 mod: festival_delicacies,createdelight,createaddition |
| server_scripts/Festival Delicacies/dumplings.js | 跳过 | 缺 mod: festival_delicacies,dumplings_delight,vintagedelight,butchercraft,some_assembly_required |
| server_scripts/Festival Delicacies/tags.js | 跳过 | 缺 mod: createdelight,dumplings_delight,festival_delicacies |
| server_scripts/Feywild/biome_tags.js | 跳过 | 缺 mod: terralith |
| server_scripts/Fruits Delight/interaction.js | 搬入 ✓ |  |
| server_scripts/Fruits Delight/loot.js | 搬入 ✓ |  |
| server_scripts/Fruits Delight/recipes.js | 跳过 | 缺 mod: vintagedelight,createdelight,youkaishomecoming |
| server_scripts/Fruits Delight/tag.js | 跳过 | 缺 mod: createdelightcore,vintagedelight |
| server_scripts/Frycooks Delight/recipes.js | 跳过 | 缺 mod: frycooks_delight,some_assembly_required,createdelight,createaddition,createdelightcore |
| server_scripts/Functional Storage/bug_fix.js | 搬入 ✓ |  |
| server_scripts/Functional Storage/recipes.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Gateways/gate_pearl.js | 跳过 | 缺 mod: gateways,createdelight,iceandfire,alexscaves,alexsmobs |
| server_scripts/Ice and Fire/collect_dragon_blood.js | 跳过 | 缺 mod: createdelight,iceandfire |
| server_scripts/Ice and Fire/dragon_blood.js | 跳过 | 缺 mod: iceandfire,createdelight,createdelightcore |
| server_scripts/Ice and Fire/dragon_steel.js | 跳过 | 缺 mod: iceandfire,createdelightcore,createdelight |
| server_scripts/Ice and Fire/loot.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Ice and Fire/prevent_summon.js | 跳过 | Northstar 已删 |
| server_scripts/Ice and Fire/recipes.js | 跳过 | 缺 mod: iceandfire,dreadsteel,createdelight,createdelightcore,butchercraft |
| server_scripts/Ice and Fire/remove.js | 跳过 | 缺 mod: iceandfire,dreadsteel |
| server_scripts/Ice and Fire/tags.js | 跳过 | 缺 mod: iceandfire,createdelight,createdelightcore |
| server_scripts/Ice and Fire/trade.js | 跳过 | 缺 mod: iceandfire,createdelightcore,tetra |
| server_scripts/Immersive Aircraft/craft.js | 跳过 | 缺 mod: immersive_aircraft,alloyed,createdelight,create_sa,man_of_many_planes |
| server_scripts/Improved Mobs/loot.js | 剔除 | 二轮过滤 |
| server_scripts/Improved Mobs/player_death.js | 剔除 | 二轮过滤 |
| server_scripts/Improved Mobs/quest.js | 剔除 | 二轮过滤 |
| server_scripts/Improved Mobs/system.js | 剔除 | 二轮过滤 |
| server_scripts/Improved Mobs/utils.js | 剔除 | 二轮过滤 |
| server_scripts/Industrial Platform/recipes.js | 搬入 ✓ |  |
| server_scripts/Kaleidoscope Doll/recipes.js | 搬入 ✓ |  |
| server_scripts/Kinetic Pixel/recipes.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/Kinetic Pixel/tag.js | 跳过 | Northstar 已删 |
| server_scripts/Kinetic Pixel/trade.js | 搬入 ✓ |  |
| server_scripts/Lets Do/bug_fix.js | 跳过 | 缺 mod: vinery,nethervinery,createdelightcore,createdelight |
| server_scripts/Lets Do/recipe.js | 跳过 | 缺 mod: conditional,vinery,createdelight |
| server_scripts/Lets Do/remove_fxxking_things.js | 跳过 | 缺 mod: vinery |
| server_scripts/Lightmans Currency/economic.js | 跳过 | 缺 mod: lightmanscurrency,create_sa,createdelightcore,createdelight |
| server_scripts/Lightmans Currency/entity_loot.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Lightmans Currency/recipes.js | 跳过 | 缺 mod: lightmanscurrency,lctech,createutilities,createaddition |
| server_scripts/Lightmans Currency/tags.js | 跳过 | 缺 mod: lctech |
| server_scripts/Lightmans Currency/white_list.js | 跳过 | Northstar 已删 |
| server_scripts/Luncheon Meats Delight/recipes.js | 跳过 | 缺 mod: bakeries,createdelight |
| server_scripts/Miners Delight/recipe.js | 跳过 | 缺 mod: miners_delight,kinetic_pixel,createdelight,some_assembly_required |
| server_scripts/Miners Delight/tags.js | 跳过 | 缺 mod: miners_delight,alexscaves |
| server_scripts/My Nethers Delight/compat.js | 跳过 | 缺 mod: bakeries |
| server_scripts/My Nethers Delight/recipes.js | 跳过 | 缺 mod: createdelight,some_assembly_required,create_bic_bit,createmetallurgy,netherexp |
| server_scripts/My Nethers Delight/remove.js | 搬入 ✓ |  |
| server_scripts/My Nethers Delight/tags.js | 跳过 | 缺 mod: netherexp |
| server_scripts/Neapolitan/bug_fix.js | 搬入 ✓ |  |
| server_scripts/Neapolitan/recipes.js | 跳过 | 缺 mod: cosmopolitan,vintagedelight,createdelight,youkaishomecoming |
| server_scripts/Neapolitan/tags.js | 跳过 | Northstar 已删 |
| server_scripts/Nether Exp/loot.js | 跳过 | 缺 mod: netherexp |
| server_scripts/Nether Exp/recipe.js | 跳过 | 缺 mod: netherexp,tetracelium,createdelight,create_bic_bit |
| server_scripts/Nether Exp/tags.js | 跳过 | 缺 mod: netherexp |
| server_scripts/Northstar Curios Compat/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Northstar/debug_rocket_commands.js | 跳过 | Northstar 已删 |
| server_scripts/Northstar/lunar_farside.js | 跳过 | Northstar 已删 |
| server_scripts/Northstar/recipes.js | 跳过 | Northstar 已删 |
| server_scripts/Northstar/space_atlas_commands.js | 跳过 | Northstar 已删 |
| server_scripts/Northstar/virtual_satellite_navigation.js | 跳过 | Northstar 已删 |
| server_scripts/Oceanic Delight/recipes.js | 跳过 | 缺 mod: oceanic_delight,tetracelium,createdelight,casualness_delight,createdelightcore |
| server_scripts/Oceanic Delight/tags.js | 跳过 | 缺 mod: oceanic_delight |
| server_scripts/One Enough Value/base_value.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/One Enough Value/recipe_handler.js | 搬入 ✓ |  |
| server_scripts/Quality Food/absorber.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Quality Food/event.js | 搬入 ✓ |  |
| server_scripts/Quality Food/tags.js | 跳过 | 缺 mod: youkaishomecoming,cavedelight,farmersrespite,oceanic_delight,silentsdelight |
| server_scripts/Quark/recipes.js | 跳过 | 缺 mod: createdelight |
| server_scripts/Refurbished Furniture/burger_and_sandwich.js | 跳过 | 缺 mod: vintagedelight,silentsdelight,some_assembly_required,collectorsreap,alexsmobs |
| server_scripts/Refurbished Furniture/compat.js | 跳过 | 缺 mod: some_assembly_required |
| server_scripts/Seasonals/recipe.js | 跳过 | 缺 mod: seasonals,some_assembly_required,createdelight |
| server_scripts/Sequenced Pattern Provider/recipe.js | 跳过 | Northstar 已删 |
| server_scripts/Silents delight/recipes.js | 跳过 | 缺 mod: silentsdelight |
| server_scripts/Sol Applepie/util.js | 搬入 ✓ |  |
| server_scripts/Some Assembly Required/recipes.js | 跳过 | 缺 mod: some_assembly_required,tetracelium,createdelight,bakeries |
| server_scripts/Some Assembly Required/tags.js | 跳过 | 缺 mod: some_assembly_required,festival_delicacies |
| server_scripts/Sophisticated Backpacks/recipes.js | 搬入 ✓ |  |
| server_scripts/Sophisticated Backpacks/upgrade.js | 搬入 ✓ |  |
| server_scripts/Supplementaries/recipes.js | 跳过 | 缺 mod: createdelight |
| server_scripts/TACZ/applied_armorer.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/TACZ/misc.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/TACZ/recipes.js | 跳过 | TACZ 按要求关掉 |
| server_scripts/Tetra/effect/black_knight_materials.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/charge.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/dragon_restraint.js | 剔除 | 二轮过滤 |
| server_scripts/Tetra/effect/fiber_proliferation.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/forestall.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/frozen.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/irradiation.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/life_drain.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/overwhelm.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/effect/util.js | 剔除 | 二轮过滤 |
| server_scripts/Tetra/mmt_curios_scrolls.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/recipe.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/Tetra/tag.js | 跳过 | Tetra/ImprovedMobs 已删 |
| server_scripts/The Bumblezone/loot.js | 跳过 | 缺 mod: createdelight |
| server_scripts/The Bumblezone/recipes.js | 跳过 | 缺 mod: createdelight,createdelightcore |
| server_scripts/The Bumblezone/tags.js | 搬入 ✓ |  |
| server_scripts/The End/craft.js | 跳过 | 缺 mod: createdelight |
| server_scripts/The End/loot.js | 搬入 ✓ |  |
| server_scripts/Trales&Tales Delight/recipe.js | 跳过 | 缺 mod: createdelight,farmersrespite,createmetallurgy |
| server_scripts/Trales&Tales Delight/tags.js | 搬入 ✓ |  |
| server_scripts/Vinery/bug_fix.js | 跳过 | 缺 mod: vinery,createdelight |
| server_scripts/Vinery/fluid_recipe.js | 跳过 | 缺 mod: vinery,createdelight |
| server_scripts/Vinery/recipe.js | 跳过 | 缺 mod: vinery,nethervinery,createdelight |
| server_scripts/Vinery/tag.js | 跳过 | 缺 mod: vinery,nethervinery |
| server_scripts/Vinery/trade.js | 跳过 | 缺 mod: vinery,createdelightcore |
| server_scripts/Vintage Delight/loot.js | 跳过 | 缺 mod: vintagedelight |
| server_scripts/Vintage Delight/pepper.js | 跳过 | 缺 mod: farmersrespite,casualness_delight,vintagedelight,createdelight,butchercraft |
| server_scripts/Vintage Delight/recipes.js | 跳过 | 缺 mod: vintagedelight,createdelight,bakeries,ratatouille,create_bic_bit |
| server_scripts/Vintage Delight/tag.js | 跳过 | 缺 mod: vintagedelight |
| server_scripts/Youkai's Homecoming/loot.js | 跳过 | 缺 mod: youkaishomecoming,alexsmobs |
| server_scripts/Youkai's Homecoming/recipe.js | 跳过 | 缺 mod: createdelight,youkaishomecoming,vinery,bakeries,createaddition |
| server_scripts/Youkai's Homecoming/sushi.js | 跳过 | 缺 mod: youkaishomecoming,silentsdelight,create_bic_bit,createdelight,collectorsreap |
| server_scripts/Youkai's Homecoming/tags.js | 跳过 | 缺 mod: youkaishomecoming,farmersrespite,oceanic_delight,collectorsreap,alexsmobs |
| server_scripts/mbd2/alloy_electric_furnace.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/assembly_line.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/butchery_room.js | 跳过 | 缺 mod: butchercraft,createdelight |
| server_scripts/mbd2/centrifugation.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/contract_executor.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/dryer.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/event.js | 跳过 | 缺 mod: create_new_age,createdelight |
| server_scripts/mbd2/greenhouse_builder.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/hydropower_station.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/life_matter_extractor.js | 跳过 | 缺 mod: createdelight,createdelightcore |
| server_scripts/mbd2/mbd2.js | 跳过 | Northstar 已删 |
| server_scripts/mbd2/mechanic_grinding_wheel.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/mechanical_craft_encoder.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/mortar.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/order_deliverer.js | 跳过 | 缺 mod: createdelight,create_sa |
| server_scripts/mbd2/order_submission_port.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/reactor.js | 跳过 | 缺 mod: createdelight,alexscaves,create_new_age |
| server_scripts/mbd2/reactor_controller.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2/sell_bin.js | 跳过 | 缺 mod: iceandfire,createdelight |
| server_scripts/mbd2/sprinkler.js | 跳过 | 缺 mod: createdelight |
| server_scripts/mbd2_recipes/alloy_electric_furnace.js | 跳过 | Northstar 已删 |
| server_scripts/mbd2_recipes/butchery.js | 跳过 | 缺 mod: butchercraft,createdelight |
| server_scripts/mbd2_recipes/centrifugation.js | 跳过 | 缺 mod: vintageimprovements,alexscaves,createdelight,createmetallurgy,createdelightcore |
| server_scripts/mbd2_recipes/proxy_recipe/centrifugation.js | 跳过 | 缺 mod: vintageimprovements |
| server_scripts/mbd2_recipes/proxy_recipe/util.js | 搬入 ✓ |  |
| server_scripts/ratatouille/cake.js | 跳过 | 缺 mod: farmersrespite,ratatouille,bakeries,createdelight |
| server_scripts/ratatouille/chocolate.js | 跳过 | 缺 mod: ratatouille,createdelightcore,farmersrespite,createdelight,createaddition |
| server_scripts/ratatouille/compat.js | 跳过 | 缺 mod: ratatouille,createdelight,createdelightcore,bakeries,vintagedelight |
| server_scripts/ratatouille/recipes.js | 跳过 | 缺 mod: ratatouille,createaddition,createdelight,youkaishomecoming |
| server_scripts/ratatouille/sausage.js | 跳过 | 缺 mod: butchercraft,ratatouille,createdelight |
| server_scripts/ratatouille/tart.js | 跳过 | 缺 mod: bakeries,createdelight,cosmopolitan |
| server_scripts/ratatouille/wheat&oat&rice.js | 跳过 | 缺 mod: alexsmobs,vintagedelight,ratatouille,createdelight,createdelightcore |
| server_scripts/util/SeasonUtil.js | 搬入 ✓ |  |
| server_scripts/util/brewinandchewin.js | 剔除 | 二轮过滤 |
| server_scripts/util/direction.js | 搬入 ✓ |  |
| server_scripts/util/energy.js | 搬入 ✓ |  |
| server_scripts/util/festival_delicacies.js | 剔除 | 二轮过滤 |
| server_scripts/util/loot.js | 搬入 ✓ |  |
| server_scripts/util/metallurgy.js | 跳过 | 缺 mod: createdelight,createmetallurgy,vintageimprovements |
| server_scripts/util/ratatouille.js | 跳过 | 缺 mod: createdelightcore,createdelight,ratatouille |
| server_scripts/util/reactor.js | 跳过 | 缺 mod: createdelight,netherexp |
| server_scripts/util/recipes.js | 剔除 | 二轮过滤 |
| server_scripts/util/refurbished_furniture.js | 剔除 | 二轮过滤 |
| server_scripts/util/respite.js | 跳过 | 缺 mod: farmersrespite,createdelight |
| server_scripts/util/trade.js | 搬入 ✓ |  |
| server_scripts/yungs/spawned.js | 搬入 ✓ |  |
| startup_scripts/00_java_classes.js | 剔除 | 二轮过滤 |
| startup_scripts/@recipes/create_bic_bit.js | 跳过 | 缺 mod: create_bic_bit |
| startup_scripts/@recipes/create_new_age.js | 跳过 | 缺 mod: create_new_age |
| startup_scripts/@recipes/createaddition.js | 跳过 | 缺 mod: createaddition |
| startup_scripts/@recipes/createdelightcore.js | 搬入 ✓ |  |
| startup_scripts/@recipes/createdieselgenerators.js | 搬入 ✓ |  |
| startup_scripts/@recipes/createmetallurgy.js | 跳过 | 缺 mod: createmetallurgy |
| startup_scripts/@recipes/festival_delicacies.js | 跳过 | 缺 mod: festival_delicacies |
| startup_scripts/@recipes/iceandfire.js | 跳过 | 缺 mod: iceandfire |
| startup_scripts/@recipes/prelude.js | 搬入 ✓ |  |
| startup_scripts/@recipes/ratatouille.js | 跳过 | 缺 mod: ratatouille |
| startup_scripts/@recipes/sophisticatedbackpacks.js | 搬入 ✓ |  |
| startup_scripts/@recipes/vintagedelight.js | 跳过 | 缺 mod: vintagedelight |
| startup_scripts/@recipes/youkaishomecoming.js | 跳过 | 缺 mod: youkaishomecoming |
| startup_scripts/TACZ/gunpack_compat.js | 跳过 | TACZ 按要求关掉 |
| startup_scripts/attach_capability.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/createdelight_tetra_module _inventory.js | 跳过 | 缺 mod: meng,tetra |
| startup_scripts/createdelight_tetra_module.js | 跳过 | 缺 mod: tetra |
| startup_scripts/creative_tab/ae2.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/creative_tab/ae2omnicells.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/creative_tab/alexscaves.js | 跳过 | 缺 mod: alexscaves |
| startup_scripts/creative_tab/appliedcreate.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/bakeries.js | 跳过 | 缺 mod: bakeries |
| startup_scripts/creative_tab/blackknightarmor.js | 跳过 | 缺 mod: blackknightarmor |
| startup_scripts/creative_tab/brewinandchewin.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/butchercraft.js | 跳过 | 缺 mod: butchercraft |
| startup_scripts/creative_tab/casualness_delight.js | 跳过 | 缺 mod: casualness_delight |
| startup_scripts/creative_tab/collectorsreap.js | 跳过 | 缺 mod: collectorsreap |
| startup_scripts/creative_tab/corn_delight.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/cosmopolitan.js | 跳过 | 缺 mod: cosmopolitan |
| startup_scripts/creative_tab/crabbersdelight.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/create.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/create_bic_bit.js | 跳过 | 缺 mod: create_bic_bit |
| startup_scripts/creative_tab/create_central_kitchen.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/create_confectionery.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/create_connected.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/create_deepfried.js | 跳过 | 缺 mod: create_deepfried |
| startup_scripts/creative_tab/create_fantasizing.js | 跳过 | 缺 mod: create_fantasizing |
| startup_scripts/creative_tab/create_new_age.js | 跳过 | 缺 mod: create_new_age,alexscaves |
| startup_scripts/creative_tab/create_sa.js | 跳过 | 缺 mod: create_sa |
| startup_scripts/creative_tab/createaddition.js | 跳过 | 缺 mod: createaddition |
| startup_scripts/creative_tab/createcafe.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/createdeco.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/createdelight.js | 跳过 | 缺 mod: createdelightcore,createdelight,mbd2 |
| startup_scripts/creative_tab/createdieselgenerators.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/createfluidstuffs.js | 跳过 | 缺 mod: createfluidstuffs |
| startup_scripts/creative_tab/createoreexcavation.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/creative_tab/createsolar.js | 跳过 | 缺 mod: createsolar |
| startup_scripts/creative_tab/createutilities.js | 跳过 | 缺 mod: createutilities |
| startup_scripts/creative_tab/dumplings_delight.js | 跳过 | 缺 mod: dumplings_delight |
| startup_scripts/creative_tab/expatternprovider.js | 跳过 | 缺 mod: expatternprovider,alexscaves,vintageimprovements,ratatouille,createdelight |
| startup_scripts/creative_tab/farmersdelight.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/farmersrespite.js | 跳过 | 缺 mod: farmersrespite |
| startup_scripts/creative_tab/festival_delicacies.js | 跳过 | 缺 mod: festival_delicacies,createdelight |
| startup_scripts/creative_tab/frycooks_delight.js | 跳过 | 缺 mod: frycooks_delight |
| startup_scripts/creative_tab/iceandfire.js | 跳过 | 缺 mod: iceandfire,dreadsteel |
| startup_scripts/creative_tab/kinetic_pixel.js | 跳过 | 缺 mod: kinetic_pixel |
| startup_scripts/creative_tab/kubejs.js | 跳过 | 缺 mod: createdelight,tetra,blackknightarmor |
| startup_scripts/creative_tab/lightmanscurrency.js | 跳过 | 缺 mod: lightmanscurrency |
| startup_scripts/creative_tab/megacells.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/creative_tab/minecraft.js | 跳过 | 缺 mod: farmersrespite,dreadsteel,mbd2 |
| startup_scripts/creative_tab/mynethersdelight.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/neapolitan.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/northstar.js | 跳过 | Northstar 已删 |
| startup_scripts/creative_tab/oceanic_delight.js | 跳过 | 缺 mod: oceanic_delight |
| startup_scripts/creative_tab/ratatouille.js | 跳过 | 缺 mod: ratatouille,createdelight |
| startup_scripts/creative_tab/refurbished_furniture.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/seasonals.js | 跳过 | 缺 mod: seasonals |
| startup_scripts/creative_tab/silentsdelight.js | 跳过 | 缺 mod: silentsdelight |
| startup_scripts/creative_tab/sophisticatedcore.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/tacz.js | 跳过 | TACZ 按要求关掉 |
| startup_scripts/creative_tab/tetra.js | 跳过 | 缺 mod: tetra,createdelight |
| startup_scripts/creative_tab/the_bumblezone.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/creative_tab/torchmaster.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/trailandtales_delight.js | 搬入 ✓ |  |
| startup_scripts/creative_tab/vintagedelight.js | 跳过 | 缺 mod: vintagedelight |
| startup_scripts/creative_tab/vintageimprovements.js | 跳过 | 缺 mod: vintageimprovements |
| startup_scripts/creative_tab/youkaishomecoming.js | 跳过 | 缺 mod: youkaishomecoming |
| startup_scripts/crop.js | 跳过 | 缺 mod: createdelight,festival_delicacies,kinetic_pixel |
| startup_scripts/custom/loot_data.js | 跳过 | 缺 mod: createdelight,iceandfire |
| startup_scripts/custom/order/data.js | 搬入 ✓ |  |
| startup_scripts/custom/order/event.js | 搬入 ✓ |  |
| startup_scripts/custom/order/system.js | 跳过 | 缺 mod: createdelight,lightmanscurrency,createdelightcore |
| startup_scripts/custom/procurement.js | 搬入 ✓ |  |
| startup_scripts/custom/register_air_armors.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/custom/register_crushed_metal.js | 剔除 | 二轮过滤 |
| startup_scripts/custom/register_metal_dust.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/custom/register_orbital_telemetry_scanner.js | 跳过 | Northstar 已删 |
| startup_scripts/custom/register_virtual_satellite.js | 跳过 | Northstar 已删 |
| startup_scripts/custom/value_data.js | 跳过 | 缺 mod: alexscaves,festival_delicacies,vintagedelight,youkaishomecoming,nethervinery |
| startup_scripts/custom_portal.js | 跳过 | 缺 mod: createdelight,alexscaves |
| startup_scripts/effect/DragonBreathResistanceEffect.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/effectInWorkbench.js | 跳过 | 缺 mod: createdelight,yi |
| startup_scripts/forge_event.js | 剔除 | 二轮过滤 |
| startup_scripts/global_value.js | 搬入 ✓ |  |
| startup_scripts/modifier_burntime.js | 跳过 | 缺 mod: createdelight,createmetallurgy,createaddition |
| startup_scripts/modifier_item.js | 跳过 | 缺 mod: farmersrespite,youkaishomecoming,butchercraft,bakeries,cosmopolitan |
| startup_scripts/registery_mob_effect.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/registery_sound.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/registry_block.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/registry_fluid.js | 跳过 | 缺 mod: createdelight |
| startup_scripts/registry_item.js | 跳过 | Northstar 已删 |
| startup_scripts/registry_machine.js | 搬入 ✓ |  |
| startup_scripts/registry_scroll.js | 跳过 | 缺 mod: tetra |
| startup_scripts/special_spout.js | 跳过 | 缺 mod: createdelight,create_sa,alexscaves |
| startup_scripts/utils/money.js | 跳过 | 缺 mod: createdelightcore,createdelight |
| startup_scripts/utils/tetra.js | 剔除 | 二轮过滤 |
