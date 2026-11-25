
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads4");
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
async function getj(url) { const r = await fetch(url, { headers: UA }); if (!r.ok) return null; return r.json(); }
async function save(url, name) { const r = await fetch(url, { headers: UA }); if (!r.ok) return "HTTP" + r.status; const b = Buffer.from(await r.arrayBuffer()); fs.writeFileSync(path.join(dlDir, name), b); return (b.length / 1048576).toFixed(2) + "MB"; }
function cfurl(f) { return "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name); }

// OELib 0.3.2
const ol = await getj("https://api.cfwidget.com/minecraft/mc-mods/oelib");
const oNeo = (ol.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
oNeo.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
console.log("OELib:", oNeo[0].name, await save(cfurl(oNeo[0]), oNeo[0].name));

// FTB Chunks / Filter 旧版候选
for (const [slug, prefix] of [["ftb-chunks", "ftb-chunks-neoforge-"], ["ftb-filter-system", "ftb-filter-system-neoforge-"]]) {
  const j = await getj("https://api.cfwidget.com/minecraft/mc-mods/" + slug);
  const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
  neo.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
  console.log("\n" + slug + " 1.21.1 versions:", neo.map((f) => f.name).slice(0, 8).join(", "));
  for (const f of neo.slice(0, 4)) {
    const r = await save(cfurl(f), f.name);
    console.log("  saved", f.name, r);
  }
}
