// [CDR→MDEC 移植版] 缺失的 Java 类不再让整个文件炸掉，改为返回 null 并打警告
function __cdrLoadClass(p) {
    try { return Java.loadClass(p); } catch (e) { console.warn("[CDR-port] 缺失 Java 类: " + p); return null; }
}
// priority: 1200

global.CDClientJavaClasses = {
    $ACParticleRegistry: __cdrLoadClass("com.github.alexmodguy.alexscaves.client.particle.ACParticleRegistry"),
    $BlockParticleOption: __cdrLoadClass("net.minecraft.core.particles.BlockParticleOption"),
    $BlockStateProperties: __cdrLoadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties"),
    $CDConfig: __cdrLoadClass("io.github.jasonsimpart.createdelightcore.CDConfig"),
    $CreateSceneBuilder: __cdrLoadClass("com.simibubi.create.foundation.ponder.CreateSceneBuilder"),
    $FeatureToggle: __cdrLoadClass("com.hlysine.create_connected.config.FeatureToggle"),
    $FluidFX: __cdrLoadClass("com.simibubi.create.content.fluids.FluidFX"),
    $HoloGui: __cdrLoadClass("se.mickelus.tetra.items.modular.impl.holo.gui.HoloGui"),
    $ItemEffect: __cdrLoadClass("se.mickelus.tetra.effect.ItemEffect"),
    $ItemParticleOption: __cdrLoadClass("net.minecraft.core.particles.ItemParticleOption"),
    $Lighting: __cdrLoadClass("com.mojang.blaze3d.platform.Lighting"),
    $ModularItem: __cdrLoadClass("se.mickelus.tetra.items.modular.ModularItem"),
    $ParticleTypes: __cdrLoadClass("net.minecraft.core.particles.ParticleTypes"),
    $QualityConfig: __cdrLoadClass("de.cadentem.quality_food.config.QualityConfig"),
    $QualityUtils: __cdrLoadClass("de.cadentem.quality_food.util.QualityUtils"),
    $Rarity: __cdrLoadClass("net.minecraft.world.item.Rarity"),
    $ResourceLocation: __cdrLoadClass("net.minecraft.resources.ResourceLocation"),
    $SequencedAssemblyItem: __cdrLoadClass("com.simibubi.create.content.processing.sequenced.SequencedAssemblyItem"),
    BetterCombat$KeyBindings: __cdrLoadClass("net.bettercombat.client.BetterCombatKeybindings"),
    improvedMobs$CapabilityProvider: __cdrLoadClass("io.github.flemmli97.improvedmobs.forge.capability.CapabilityProvider")
}
