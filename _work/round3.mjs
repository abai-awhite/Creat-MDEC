
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const work = path.join(root, "_work");
const dlDir = path.join(work, "downloads3");
fs.mkdirSync(dlDir, { recursive: true });
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const UACF = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = [];
const say = (s) => { console.log(s); log.push(s); };

async function jget(url, hdrs = UA, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: hdrs });
      if (r.status === 429 || r.status === 503) { await sleep(1200 * (i + 1)); continue; }
      if (r.status === 404) return { status: 404 };
      if (!r.ok) return { status: r.status };
      return { status: 200, data: await r.json() };
    } catch { await sleep(700 * (i + 1)); }
  }
  return { status: -1 };
}
async function dlFile(url, filename) {
  const out = path.join(dlDir, filename);
  if (fs.existsSync(out)) return "exists";
  try {
    const r = await fetch(url, { headers: UA });
    if (!r.ok) return "HTTP" + r.status;
    const buf = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(out, buf);
    return (buf.length / 1048576).toFixed(1) + "MB";
  } catch (e) { return "FAIL"; }
}
async function mrDownload(slug, tag) {
  const p = await jget("https://api.modrinth.com/v2/project/" + slug);
  if (p.status !== 200) { say("[MR] " + slug + " -> project " + p.status + " (" + tag + ")"); return null; }
  const v = await jget("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq);
  if (v.status !== 200 || !v.data.length) { say("[MR] " + slug + " -> no 1.21.1 (" + tag + ")"); return null; }
  const ver = v.data[0];
  const f = ver.files.find((x) => x.primary) || ver.files[0];
  const r = await dlFile(f.url, f.filename);
  say("[MR] " + slug + " " + ver.version_number + " " + f.filename + " " + r);
  return { slug, title: p.data.title, version: ver.version_number, filename: f.filename };
}
async function cfDownload(slug) {
  const p = await jget("https://api.cfwidget.com/minecraft/mc-mods/" + encodeURIComponent(slug), UACF);
  if (p.status !== 200) return null;
  const j = p.data;
  const files = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  if (!files.length) return { slug, title: j.title, file121: null };
  files.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
  const f = files[0];
  const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name);
  const r = await dlFile(url, f.name);
  say("[CF] " + slug + " " + j.title + " " + f.name + " " + r);
  return { slug, title: j.title, file121: f.name, fileId: f.id };
}

// ===== A. FTB 全家桶 =====
say("=== FTB ===");
const ftb = ["ftb-library", "ftb-quests", "ftb-teams", "ftb-ultimine", "ftb-xmod-compat", "ftb-essentials", "ftb-ranks", "ftb-chunks", "ftb-filter-system", "ftb-money", "ftb-quests-localizer", "ftb-chunks-x-xaeros-compat"];
for (const s of ftb) { await mrDownload(s, "FTB"); await sleep(80); }

// ===== B. AE2 附属 =====
say("=== AE2 ===");
const ae2 = ["ae2", "applied-energistics-2-wireless-terminals", "extended-ae", "extendedae-plus", "mega", "glodium", "applied-create", "ae2-omni-cells", "ae2-import-export-card", "ae2-wcwt", "assembler-matrix-prioritization", "ae2-qol-recipes", "merequester", "ae2-crystal-science", "ae2-lightning-tech", "bigger-ae2", "ae2-better-villagers", "probability-pattern", "ae2-molecular-assembler-plus", "applied-channel-management", "neoecoae", "ae-additions", "applied-experienced", "ae2-toggleable-viewcell", "ae2-jei-integration"];
for (const s of ae2) { await mrDownload(s, "AE2"); await sleep(80); }

// ===== C. 性能 / 视觉 =====
say("=== PERF/VISUAL ===");
const perf = ["debugify", "memoryleakfix", "cull-less-leaves", "smooth-boot", "fast-loading", "particle-core", "euphoria-patches", "iris", "sodium", "lithium", "ferrite-core", "modernfix", "immediatelyfast", "c2me", "krypton", "entityculling", "dynamic-fps", "accelerated-rendering"];
for (const s of perf) { await mrDownload(s, "PERF"); await sleep(80); }

// ===== D. 食物复核（CurseForge）=====
say("=== FOOD CHECK (CF) ===");
const foods = {
  cavedelight: "Cave Delight", collectorsreap: "Collector's Reap", dumplingsdelight: "Dumplings Delight",
  farmersrespite: "Farmer's Respite", festivaldelicacies: "Festival Delicacies", frycooksdelight: "Frycook's Delight",
  oceanicdelight: "Oceanic Delight", seasonals: "Seasonals", silentsdelight: "Silent's Delight",
  vintagedelight: "Vintage Delight", nethervinery: "NetherVinery", centralvintage: "Central Vintage",
  alwayseat: "AlwaysEat", qualityfoodfluids: "Quality Food Fluids"
};
const foodReport = [];
for (const [slug, name] of Object.entries(foods)) {
  const p = await jget("https://api.cfwidget.com/minecraft/mc-mods/" + slug, UACF);
  if (p.status !== 200) { foodReport.push({ name, cf: null }); say("[FOOD] " + name + " CF-404"); continue; }
  const j = p.data;
  const allVers = [...new Set((j.files || []).flatMap((f) => f.versions || []))].filter((v) => /^\d+\.\d+(\.\d+)?$/.test(v)).sort();
  const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  foodReport.push({ name, title: j.title, latest: allVers.slice(-5), has121neo: neo.length ? neo[0].name : null });
  say("[FOOD] " + name + " | CF: " + j.title + " | 最新版本: " + allVers.slice(-4).join("/") + " | 1.21.1-NeoForge: " + (neo.length ? neo[0].name : "无"));
  if (neo.length) {
    const f = neo[0];
    const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name);
    const r = await dlFile(url, f.name);
    say("   -> downloaded " + r);
  }
  await sleep(100);
}

// ===== E. 待确认 26 =====
say("=== UNKNOWN LOOKUP ===");
const unknown = [
  ["advanced-loot-info", "AdvancedLootInfo"], ["advancedlootinfo", "AdvancedLootInfo"],
  ["ae2-crafting-tree", "ae2CraftingTree"], ["ae2ct", "ae2CraftingTree"],
  ["ae2-network-analyser", "AE2NetworkAnalyzer"], ["ae2-network-analyzer", "AE2NetworkAnalyzer"], ["ae2netanalyser", "AE2NetworkAnalyzer"],
  ["alexs-delight", "Alex's Delight"], ["alex-s-delight", "Alex's Delight"],
  ["black-knight-armor", "Black Knight Armor"], ["blackknightarmor", "Black Knight Armor"],
  ["create-jetpack-curios", "Create: Jetpack Curios"], ["create_jetpack_curios", "Create: Jetpack Curios"],
  ["create-better-storages", "Create: Better Storages"], ["create-bs", "Create: Better Storages"],
  ["createbiggerstoragetocreate6", "CreateBiggerStorageToCreate6"],
  ["create-fluid-stuffs", "CreateFluidStuffs"], ["create-fluidstuffs", "CreateFluidStuffs"],
  ["euphoria-patcher", "Euphoria Patcher"], ["euphoria-patches", "Euphoria Patcher"],
  ["ftb-quests-localizer", "FTB Quests Localizer"], ["ftbquestlocalizer", "FTB Quests Localizer"],
  ["just-enough-effect-descriptions", "Just Enough Effects Descriptions"], ["jeed", "Just Enough Effects Descriptions"],
  ["kinetic-pixel", "Kinetic Pixel"], ["kubejs-delight", "KubeJSDelight"], ["kubejsdelight", "KubeJSDelight"],
  ["more-mod-tetra", "More Mod Tetra"], ["nebulus-better-portals", "Nebulus better portals"],
  ["one-enough-item", "OneEnoughItem"], ["one-enough-value", "OneEnoughValue"],
  ["ponder-js", "PonderJS"], ["ponderjs", "PonderJS"],
  ["sequenced-pattern-provider", "Sequenced Pattern Provider"], ["sequenced-pattern-providers", "Sequenced Pattern Provider"],
  ["timeless-and-classics-zero", "TACZ"], ["tacz", "TACZ"],
  ["terrain-graph", "TerrainGraph"], ["terraingraph", "TerrainGraph"],
  ["visual-keybinder", "Visual Keybinder"], ["vv-addon", "VVAddon"], ["vvaddon", "VVAddon"],
  ["youkaishomecoming-curios", "YoukaisHomecoming_curios"]
];
const unknownRes = {};
for (const [slug, name] of unknown) {
  if (unknownRes[name]) continue;
  const p = await jget("https://api.cfwidget.com/minecraft/mc-mods/" + slug, UACF);
  if (p.status !== 200) { await sleep(80); continue; }
  const j = p.data;
  const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  unknownRes[name] = { slug, title: j.title, file121: neo.length ? neo[0].name : null, fileId: neo.length ? neo[0].id : null };
  say("[UNK] " + name + " -> " + j.title + " (" + slug + ") | 1.21.1: " + (neo.length ? neo[0].name : "无"));
  if (neo.length) {
    const f = neo[0];
    const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name);
    const r = await dlFile(url, f.name);
    say("   -> downloaded " + r);
  }
  await sleep(80);
}
fs.writeFileSync(path.join(work, "round3-report.json"), JSON.stringify({ foodReport, unknownRes }, null, 1), "utf8");
say("DONE");
