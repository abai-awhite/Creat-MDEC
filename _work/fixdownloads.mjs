
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads");
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const facets = encodeURIComponent(JSON.stringify([["versions:1.21.1"],["categories:neoforge"]]));

async function search(query) {
  const r = await fetch("https://api.modrinth.com/v2/search?limit=6&facets=" + facets + "&query=" + q(query), { headers: UA });
  const d = await r.json();
  return d.hits || [];
}
async function versionOf(slug) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq, { headers: UA });
  if (!r.ok) return null;
  const a = await r.json();
  return a.length ? a[0] : null;
}
async function dl(slug, tag) {
  const v = await versionOf(slug);
  if (!v) { console.log("NO-VERSION", slug, tag); return; }
  const f = v.files.find((x) => x.primary) || v.files[0];
  const file = path.join(dlDir, f.filename);
  if (fs.existsSync(file)) { console.log("exists", f.filename); return; }
  const r = await fetch(f.url, { headers: UA });
  if (!r.ok) { console.log("DL-FAIL", slug, r.status); return; }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(file, buf);
  console.log("OK", slug, v.version_number, f.filename, (buf.length/1048576).toFixed(1) + "MB", "| " + tag);
}

// 已知 slug 直接下
await dl("runiclib", "dungeonsdelight 依赖");

// 猜错 slug 的，先搜再下
const terms = [
  ["create cafe", /\bcreate[-_ ]?cafe\b/i, "Create Cafe"],
  ["explorer's compass", /explorer.*compass/i, "Explorer's Compass"],
  ["quark oddities", /quark[-_ ]?oddities/i, "Quark Oddities"],
  ["trash cans", /trash[-_ ]?cans/i, "Trash Cans"],
  ["dramatic doors", /dramatic[-_ ]?doors/i, "Dramatic Doors"]
];
for (const [term, re, label] of terms) {
  const hits = await search(term);
  console.log("\n### " + label + " hits:", hits.map((h) => h.slug).join(", "));
  const best = hits.find((h) => re.test(h.slug)) || hits[0];
  if (best) await dl(best.slug, label + " (" + term + ")");
}
