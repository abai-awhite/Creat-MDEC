
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads");
fs.mkdirSync(dlDir, { recursive: true });
const manifestPath = path.join(root, "_work", "download-manifest.json");
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const start = [
  // AE2 全家
  "ae2", "applied-energistics-2-wireless-terminals", "extended-ae", "extendedae-plus", "mega",
  "glodium", "applied-create", "ae2-omni-cells", "ae2-import-export-card", "ae2-wcwt", "assembler-matrix-prioritization", "ae2-qol-recipes",
  // 食物（CDR 独有部分）
  "abnormals-delight", "corn-delight", "crabbers-delight", "cuisine-delight", "cultural-delights",
  "dungeons_delight", "fruits-delight", "luncheon-meat-s-delight", "miners-delight", "quality-food",
  "trailtales-delight", "neapolitan", "youkaishomecoming", "createcafe", "create-confectionery", "ecliptic-seasons",
  // 结构 / 探索 / 世界
  "terralith", "tectonic", "towns-and-towers", "totw-modded", "yungs-api", "yungs-better-mineshafts",
  "yungs-better-witch-huts", "yungs-extras", "integrated-villages", "integrated-stronghold", "idas",
  "l_enders-cataclysm", "the-bumblezone", "northstar-redux", "creeper-overhaul", "sparsestructures", "explorerscompass",
  // 装饰 / 建筑 / 实用
  "supplementaries", "quark", "quarkoddities", "amendments", "immersive-paintings", "waystones",
  "functional-storage", "sophisticated-backpacks", "trashcans", "dramaticdoors", "comforts",
  // 战斗 / 优化
  "better-combat", "entityculling", "dynamic-fps"
];

const manifest = [];
const visited = new Set();
let ok = 0, fail = 0;

async function j(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.status === 429 || r.status === 503) { await sleep(1200 * (i + 1)); continue; }
      if (!r.ok) return { status: r.status };
      return { status: 200, data: await r.json() };
    } catch (e) { await sleep(700 * (i + 1)); }
  }
  return { status: -1 };
}

async function download(url, file, size) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(file, buf);
      return buf.length;
    } catch (e) {
      console.log("retry download", file, String(e && e.message || e).slice(0, 80));
      await sleep(1500);
    }
  }
  return -1;
}

async function addProject(slug, depth, via) {
  if (!slug || visited.has(slug) || depth > 4) return;
  visited.add(slug);
  const pj = await j("https://api.modrinth.com/v2/project/" + encodeURIComponent(slug));
  if (pj.status !== 200) { manifest.push({ slug, status: "no-project", via }); fail++; return; }
  const proj = pj.data;
  const vr = await j("https://api.modrinth.com/v2/project/" + encodeURIComponent(slug) + "/version?" + vq);
  if (vr.status !== 200 || !vr.data.length) { manifest.push({ slug, title: proj.title, status: "no-1.21.1", via }); fail++; return; }
  const v = vr.data[0];
  const f = v.files.find((x) => x.primary) || v.files[0];
  const file = path.join(dlDir, f.filename);
  let got = -1;
  if (!fs.existsSync(file)) {
    got = await download(f.url, file, f.size);
    await sleep(80);
  } else got = fs.statSync(file).size;
  const entry = { slug, projectId: proj.id, title: proj.title, version: v.version_number, filename: f.filename, size: got, via, deps: [] };
  manifest.push(entry);
  if (got > 0) ok++; else fail++;
  for (const d of v.dependencies || []) {
    if (d.dependency_type !== "required") continue;
    if (!d.project_id) continue;
    const dp = await j("https://api.modrinth.com/v2/project/" + d.project_id);
    if (dp.status === 200) { entry.deps.push(dp.data.slug); await addProject(dp.data.slug, depth + 1, slug); }
  }
}

for (const s of start) {
  console.log("start:", s);
  await addProject(s, 0, null);
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1), "utf8");
console.log("DONE total=" + manifest.length, "downloaded=" + ok, "failed=" + fail);
const fails = manifest.filter((m) => m.status && m.status !== "ok");
console.log("failed:", JSON.stringify(fails.map((m) => m.slug + ":" + m.status)));
