// [CDR→MDEC 移植版] 缺失的 Java 类不再让整个文件炸掉，改为返回 null 并打警告
function __cdrLoadClass(p) {
    try { return Java.loadClass(p); } catch (e) { console.warn("[CDR-port] 缺失 Java 类: " + p); return null; }
}
// priority: 1200

global.CDStartupJavaClasses = {
    // Lightman's Currency
    $AuctionTradeData: __cdrLoadClass("io.github.lightman314.lightmanscurrency.common.traders.auction.tradedata.AuctionTradeData"),
    $ItemTradeData: __cdrLoadClass("io.github.lightman314.lightmanscurrency.common.traders.item.tradedata.ItemTradeData"),
    $PlayerListing: __cdrLoadClass("io.github.lightman314.lightmanscurrency.common.traders.rules.types.PlayerListing"),
    $TraderAPI: __cdrLoadClass("io.github.lightman314.lightmanscurrency.api.traders.TraderAPI"),
    $TraderData: __cdrLoadClass("io.github.lightman314.lightmanscurrency.api.traders.TraderData"),
    $TraderDataCache: __cdrLoadClass("io.github.lightman314.lightmanscurrency.common.data.types.TraderDataCache"),
    CoinValue: __cdrLoadClass("io.github.lightman314.lightmanscurrency.api.money.value.builtin.CoinValue"),
    MoneyAPI: __cdrLoadClass("io.github.lightman314.lightmanscurrency.api.money.MoneyAPI"),
    CoinAPI: __cdrLoadClass("io.github.lightman314.lightmanscurrency.api.money.coins.CoinAPI"),

    // Common startup integrations
    $BrassDroneEntity: __cdrLoadClass("net.mcreator.createstuffadditions.entity.BrassDroneEntity"),
    $CustomPortalBuilder: __cdrLoadClass("net.kyrptonaught.customportalapi.api.CustomPortalBuilder"),
    $FoodBuilder: __cdrLoadClass("dev.latvian.mods.kubejs.item.FoodBuilder"),
    $FoodInstance: __cdrLoadClass("com.tarinoita.solsweetpotato.tracking.FoodInstance"),
    $FoodList: __cdrLoadClass("com.tarinoita.solsweetpotato.tracking.FoodList"),
    $ItemEffect: __cdrLoadClass("se.mickelus.tetra.effect.ItemEffect"),
    $ModularItem: __cdrLoadClass("se.mickelus.tetra.items.modular.ModularItem"),
    $OrderCandidateFinder: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.content.order.OrderCandidateFinder"),
    $OrderDataKubeBridge: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.content.order.data.OrderDataKubeBridge"),
    $OrderGoodsQuality: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.content.order.OrderGoodsQuality"),
    $OrderInfo: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.content.order.OrderInfo"),
    $OrderTypeProperties: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.content.order.OrderTypeProperties"),
    $PackageItem: __cdrLoadClass("com.simibubi.create.content.logistics.box.PackageItem"),
    $QualityConfig: __cdrLoadClass("de.cadentem.quality_food.config.QualityConfig"),
    $QualityUtils: __cdrLoadClass("de.cadentem.quality_food.util.QualityUtils"),

    // Minecraft / Forge / CDC
    ForgeRegistries: __cdrLoadClass("net.minecraftforge.registries.ForgeRegistries"),
    CDConfig: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.CDConfig"),

    // Recipe schema registration
    probejs$$RecipeComponentBuilder: __cdrLoadClass("dev.latvian.mods.kubejs.recipe.component.RecipeComponentBuilder"),
    probejs$$RecipeSchema: __cdrLoadClass("dev.latvian.mods.kubejs.recipe.schema.RecipeSchema"),
    probejs$$RegistryInfo: __cdrLoadClass("dev.latvian.mods.kubejs.registry.RegistryInfo"),
    sophisticatedBackpacks$$RegistryInfo: __cdrLoadClass("dev.latvian.mods.kubejs.registry.RegistryInfo"),
    sophisticatedBackpacks$$ShapedRecipeSchema: __cdrLoadClass("dev.latvian.mods.kubejs.recipe.schema.minecraft.ShapedRecipeSchema")
}
global.CDLightmansCurrencyApi = {
    CoinValue: global.CDStartupJavaClasses.CoinValue,
    MoneyAPI: global.CDStartupJavaClasses.MoneyAPI,
    CoinAPI: global.CDStartupJavaClasses.CoinAPI,
    ForgeRegistries: global.CDStartupJavaClasses.ForgeRegistries,
    CDConfig: global.CDStartupJavaClasses.CDConfig,
    AuctionTradeData: global.CDStartupJavaClasses.$AuctionTradeData,
    TraderAPI: global.CDStartupJavaClasses.$TraderAPI,
    TraderData: global.CDStartupJavaClasses.$TraderData,
    ItemTradeData: global.CDStartupJavaClasses.$ItemTradeData,
    PlayerListing: global.CDStartupJavaClasses.$PlayerListing,
    TraderDataCache: global.CDStartupJavaClasses.$TraderDataCache
}

global.CDStartupJavaClasses.getTetraWorkbenchStats = function () {
    if (this.TetraWorkbenchStats == null) {
        this.TetraWorkbenchStats = {
            $StatFormat: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.StatFormat"),
            $StatGetterEffectEfficiency: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.StatGetterEffectEfficiency"),
            $TooltipGetterMultiValue: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.TooltipGetterMultiValue"),
            $WorkbenchStatsGui: __cdrLoadClass("se.mickelus.tetra.blocks.workbench.gui.WorkbenchStatsGui"),
            $StatsHelper: __cdrLoadClass("se.mickelus.tetra.gui.stats.StatsHelper"),
            $LabelGetterBasic: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.LabelGetterBasic"),
            $StatGetterEffectLevel: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.StatGetterEffectLevel"),
            $TooltipGetterInteger: __cdrLoadClass("se.mickelus.tetra.gui.stats.getter.TooltipGetterInteger"),
            $HoloStatsGui: __cdrLoadClass("se.mickelus.tetra.items.modular.impl.holo.gui.craft.HoloStatsGui"),
            $GuiStatBar: __cdrLoadClass("se.mickelus.tetra.gui.stats.bar.GuiStatBar")
        }
    }
    return this.TetraWorkbenchStats
}
