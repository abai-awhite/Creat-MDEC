
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const modsDir = path.join(root, "versions", "Create-Delight-Remake", "mods");
const outJson = path.join(root, "_work", "cdr-avail.json");
const outCsv = path.join(root, "_work", "cdr-avail.csv");
const UA = "dsh-modpack-builder/1.0";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function cleanName(file) {
  let s = file.replace(/\.jar$/i, "");
  const parts = s.split(/[-_ ]+/);
  const out = [];
  for (const p of parts) {
    if (/^(mc)?\d+(\.\d+)+$/i.test(p)) break;
    if (/^v?\d+(\.\d+)*[a-z]?$/i.test(p)) break;
    if (/^(forge|neoforge|fabric|quilt|all|universal|hotfix|beta|alpha|local|release|rc\d*|b\d+)$/i.test(p)) continue;
    out.push(p);
  }
  const cleaned = out.join(" ").trim();
  return cleaned || s.replace(/[-_]+/g, " ").trim();
}

async function getJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) return { status: r.status };
      return { status: r.status, data: await r.json() };
    } catch (e) {
      await sleep(800 * (i + 1));
    }
  }
  return { status: -1 };
}

const jars = fs.readdirSync(modsDir).filter((f) => f.toLowerCase().endsWith(".jar")).sort();
const results = [];
const facets = encodeURIComponent(JSON.stringify([["versions:1.21.1"], ["categories:neoforge"]]));
let done = 0;
async function one(file) {
  const q = cleanName(file);
  const url = "https://api.modrinth.com/v2/search?limit=8&facets=" + facets + "&query=" + encodeURIComponent(q);
  const res = await getJson(url);
  const row = { file, query: q, status: "error", match: null, hits: [] };
  if (res.status === 200 && res.data) {
    const hits = res.data.hits || [];
    row.hits = hits.map((h) => h.slug).slice(0, 4);
    const key = norm(q);
    let best = null, bestScore = 0;
    for (const h of hits) {
      const cand = [norm(h.slug), norm(h.title)];
      let score = 0;
      for (const c of cand) {
        if (!c) continue;
        if (c === key) score = Math.max(score, 1);
        else if (key.length > 4 && (c.includes(key) || key.includes(c))) score = Math.max(score, 0.85);
        else {
          const t1 = key.slice(0, Math.min(6, key.length));
          if (key.length > 4 && c.includes(t1)) score = Math.max(score, 0.55);
        }
      }
      if (score > bestScore) { bestScore = score; best = h; }
    }
    if (best && bestScore >= 0.8) {
      row.status = "available";
      row.match = { slug: best.slug, title: best.title, version: best.latest_version || "", downloads: best.downloads };
    } else if (hits.length > 0) {
      row.status = "maybe";
      row.match = { slug: hits[0].slug, title: hits[0].title, version: hits[0].latest_version || "" };
    } else {
      row.status = "none";
    }
  }
  results.push(row);
  done++;
  if (done % 25 === 0) console.log("progress", done, "/", jars.length);
}

const CONC = 3;
let idx = 0;
const workers = Array.from({ length: CONC }, async () => {
  while (idx < jars.length) {
    const f = jars[idx++];
    await one(f);
    await sleep(120);
  }
});
await Promise.all(workers);
results.sort((a, b) => a.file.localeCompare(b.file));
fs.writeFileSync(outJson, JSON.stringify(results, null, 1), "utf8");
const esc = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
fs.writeFileSync(outCsv, ["file,query,status,slug,title,version"].join(",") + "\n" + results.map((r) => [r.file, r.query, r.status, r.match?.slug, r.match?.title, r.match?.version].map(esc).join(",")).join("\n"), "utf8");
const tally = results.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
console.log("DONE", JSON.stringify(tally), "total", results.length);
