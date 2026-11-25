
import fs from "node:fs";
import path from "node:path";
const work = process.cwd() + path.sep + "_work";
const dlDir = path.join(work, "downloads3");
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
async function cf(slug) {
  try {
    const r = await fetch("https://api.cfwidget.com/minecraft/mc-mods/" + encodeURIComponent(slug), { headers: UA });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}
function pick121(j) {
  const files = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  files.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
  return files;
}
function latestMc(files) {
  const vs = [...new Set((files || []).flatMap((f) => f.versions || []))].filter((v) => /^\d+\.\d+(\.\d+)?$/.test(v));
  return vs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).slice(-3).join("/");
}
async function dl(url, name) {
  const out = path.join(dlDir, name);
  if (fs.existsSync(out)) return "exists";
  const r = await fetch(url, { headers: UA });
  if (!r.ok) return "HTTP" + r.status;
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(out, buf);
  return (buf.length / 1048576).toFixed(1) + "MB";
}

console.log("=== FTB (CurseForge) ===");
for (const slug of ["ftb-library", "ftb-quests", "ftb-teams", "ftb-ultimine", "ftb-xmod-compat", "ftb-essentials", "ftb-ranks", "ftb-chunks", "ftb-filter-system", "ftb-money", "ftb-backups-2", "ftb-trenches"]) {
  const j = await cf(slug);
  if (!j) { console.log(slug.padEnd(22), "CF-404"); continue; }
  const neo = pick121(j);
  console.log(slug.padEnd(22), j.title, "| 1.21.1:", neo.length ? neo[0].name : "无", "| 最新MC:", latestMc(j.files));
  if (neo.length) {
    const f = neo[0];
    const r = await dl("https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name), f.name);
    console.log("   ->", r);
  }
  await sleep(80);
}

console.log("\n=== 食物复核 (CF, 正确 slug) ===");
const food = ["cave-delight", "collectors-reap", "dumplings-delight", "farmers-respite", "festival-delicacies", "frycooks-delight", "oceanic-delight", "silents-delight", "vintage-delight", "nethervinery", "central-vintage", "quality-food-fluids", "seasonals", "alwayseat"];
for (const slug of food) {
  const j = await cf(slug);
  if (!j) { console.log(slug.padEnd(22), "CF-404"); continue; }
  const neo = pick121(j);
  console.log(slug.padEnd(22), j.title, "| 1.21.1:", neo.length ? neo[0].name : "无", "| 最新MC:", latestMc(j.files));
  if (neo.length) {
    const f = neo[0];
    const r = await dl("https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name), f.name);
    console.log("   ->", r);
  }
  await sleep(80);
}

console.log("\n=== 待确认补充尝试 ===");
const unk = [["black-knight-armor-mod", "Black Knight Armor"], ["blackknightarmor", "Black Knight Armor"], ["create-jetpack-curios", "Create Jetpack Curios"], ["create-jetpack", "Create Jetpack"], ["create-better-storages", "Create Better Storages"], ["createbetterstorages", "Create Better Storages"], ["createbiggerstoragetocreate6", "Create Bigger Storage"], ["create-bigger-storage", "Create Bigger Storage"], ["ftb-quests-localizer", "FTB Quests Localizer"], ["jeed", "JEED"], ["just-enough-effect-descriptions", "JEED"], ["kineticpixel", "Kinetic Pixel"], ["kinetic-pixel", "Kinetic Pixel"], ["moremodtetra", "More Mod Tetra"], ["ponderjs", "PonderJS"], ["sequenced-pattern-provider", "Sequenced Pattern Provider"], ["sequenced-pattern-providers", "Sequenced Pattern Provider"], ["visualkeybinder", "Visual Keybinder"], ["visual-keybinder", "Visual Keybinder"], ["vvaddon", "VVAddon"], ["youkaishomecoming", "YoukaisHomecoming Curios"]];
const seen = new Set();
for (const [slug, label] of unk) {
  const j = await cf(slug);
  if (!j) continue;
  const neo = pick121(j);
  const key = label + "|" + j.title;
  console.log(slug.padEnd(30), j.title, "| 1.21.1:", neo.length ? "YES " + neo[0].name : "无");
  if (neo.length && !seen.has(key)) {
    seen.add(key);
    const f = neo[0];
    const r = await dl("https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name), f.name);
    console.log("   ->", r);
  }
  await sleep(70);
}
console.log("DONE");
