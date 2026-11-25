
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads4");
fs.mkdirSync(dlDir, { recursive: true });
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const UACF = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
async function getj(url, hdrs = UA) { const r = await fetch(url, { headers: hdrs }); if (!r.ok) return null; return r.json(); }
async function save(url, name) { const r = await fetch(url, { headers: UA }); if (!r.ok) return "HTTP" + r.status; const b = Buffer.from(await r.arrayBuffer()); fs.writeFileSync(path.join(dlDir, name), b); return (b.length / 1048576).toFixed(2) + "MB"; }

console.log("=== Modrinth 升级 ===");
for (const slug of ["architectury-api", "balm", "jei", "oelib"]) {
  const a = await getj("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq);
  if (!a || !a.length) { console.log(slug, "NO-1.21.1"); continue; }
  const v = a[0];
  const f = v.files.find((x) => x.primary) || v.files[0];
  const r = await save(f.url, f.filename);
  console.log(slug.padEnd(16), v.version_number.padEnd(24), f.filename, r);
}

console.log("\n=== FTB Library (CurseForge) ===");
for (const slug of ["ftb-library-neoforge", "ftb-library-2", "ftb-library", "ftb-library-forge"]) {
  const j = await getj("https://api.cfwidget.com/minecraft/mc-mods/" + slug, UACF);
  if (!j) { console.log(slug, "CF404"); continue; }
  const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  neo.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
  console.log(slug.padEnd(20), j.title, "| files:", (j.files || []).length, "| 1.21.1:", neo.length ? neo[0].name : "无");
  if (neo.length) {
    const f = neo[0];
    const r = await save("https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name), f.name);
    console.log("   downloaded:", r);
    break;
  }
}

console.log("\n=== Quark 旧版候选 ===");
const all = await getj("https://api.modrinth.com/v2/project/quark/version?" + vq);
if (all) {
  for (const v of all.slice(0, 5)) {
    const f = v.files.find((x) => x.primary) || v.files[0];
    const r = await save(f.url, f.filename);
    console.log("quark", v.version_number, f.filename, r);
  }
}
