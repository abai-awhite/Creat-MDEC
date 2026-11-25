
import fs from "node:fs";
import path from "node:path";
const work = process.cwd() + path.sep + "_work";
const prev = JSON.parse(fs.readFileSync(path.join(work, "unknown-resolved.json"), "utf8"));
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cfCands(modId, display) {
  const out = [];
  const add = (s) => { if (s && s.length > 1 && !out.includes(s)) out.push(s); };
  add(modId);
  add(String(modId).replace(/_/g, "-"));
  if (display) {
    let d = String(display).toLowerCase().replace(/^the /, "").replace(/ mod$/, "").replace(/\[forge\]/g, "").trim();
    add(d.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  }
  return out;
}
const results = [];
for (const r of prev) {
  const cands = cfCands(r.modId, r.display);
  let hit = null;
  for (const slug of cands) {
    const res = await fetch("https://api.cfwidget.com/minecraft/mc-mods/" + encodeURIComponent(slug), { headers: UA });
    if (res.status !== 200) continue;
    const j = await res.json();
    const files = j.files || [];
    const neo = files.filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
    hit = { title: j.title, slug: slug, file121: neo.length ? neo[0].name : null, fileId: neo.length ? neo[0].id : null, versions: files.length };
    break;
  }
  results.push({ modId: r.modId, display: r.display, cf: hit });
  console.log((r.display || r.modId).padEnd(40) + " -> " + (hit ? hit.title + " | " + (hit.file121 || "only-1.20.1") : "not-found"));
  await sleep(120);
}
fs.writeFileSync(path.join(work, "unknown-resolved2.json"), JSON.stringify(results, null, 1), "utf8");
const port = results.filter((r) => r.cf && r.cf.file121);
const blocked = results.filter((r) => r.cf && !r.cf.file121);
const none = results.filter((r) => !r.cf);
console.log("\nCF 1.21.1:", port.length, "| only 1.20.1:", blocked.length, "| not-found:", none.length);
console.log("portable:", port.map((r) => r.modId).join(", "));
console.log("blocked:", blocked.map((r) => r.modId).join(", "));
console.log("none:", none.map((r) => r.modId).join(", "));
