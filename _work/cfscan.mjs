
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const work = path.join(root, "_work");
const avail = JSON.parse(fs.readFileSync(path.join(work, "cdr-avail2.json"), "utf8"));
const targets = avail.filter((r) => r.status === "not-on-modrinth" || r.status === "no-1.21.1");
console.log("待查 CurseForge:", targets.length);
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

function candidates(r) {
  const out = [];
  const add = (s) => { if (s && s.length > 1 && !out.includes(s)) out.push(s); };
  add(r.modId);
  add(String(r.modId).replace(/_/g, "-"));
  if (r.display) add(String(r.display).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  let base = r.file.replace(/\.jar$/i, "");
  base = base.replace(/[-_ ]+v?\d[\w.+]*.*$/, "").replace(/^(create|forge|neoforge)[-_ ]/i, "");
  add(base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  return out.slice(0, 5);
}

async function get(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.status === 429 || r.status === 503) { await sleep(1500 * (i + 1)); continue; }
      if (r.status === 404) return { status: 404 };
      if (!r.ok) return { status: r.status };
      return { status: 200, data: await r.json() };
    } catch { await sleep(900 * (i + 1)); }
  }
  return { status: -1 };
}

const results = [];
let done = 0;
for (const r of targets) {
  const row = { file: r.file, modId: r.modId, display: r.display, prevModrinth: r.status, cf: "not-found", title: "", slug: "", file121: null, file121Versions: null };
  for (const slug of candidates(r)) {
    const res = await get("https://api.cfwidget.com/minecraft/mc-mods/" + encodeURIComponent(slug));
    if (res.status === 200 && res.data) {
      const j = res.data;
      const titleKey = norm(j.title), dispKey = norm(r.display), idKey = norm(r.modId);
      const match = titleKey === dispKey || titleKey === idKey || (dispKey.length > 5 && (titleKey.includes(dispKey) || dispKey.includes(titleKey))) || (idKey.length > 5 && titleKey.includes(idKey));
      if (match) {
        row.cf = "found"; row.title = j.title; row.slug = slug;
        const files = j.files || [];
        const neo = files.filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
        if (neo.length) {
          neo.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
          row.file121 = neo[0].name;
          row.file121Versions = neo[0].versions;
          row.fileId = neo[0].id;
          row.url = neo[0].url;
        }
        break;
      }
    }
    await sleep(120);
  }
  results.push(row);
  done++;
  if (done % 10 === 0) console.log("progress", done, "/", targets.length, "found:", results.filter((x) => x.cf === "found").length, "1.21.1:", results.filter((x) => x.file121).length);
  await sleep(100);
}
fs.writeFileSync(path.join(work, "cf-scan.json"), JSON.stringify(results, null, 1), "utf8");
const esc = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(work, "cf-scan.csv"), ["file,modId,display,cf,title,slug,file121,fileId,url"].join(",") + "\n" + results.map((r) => [r.file, r.modId, r.display, r.cf, r.title, r.slug, r.file121, r.fileId, r.url].map(esc).join(",")).join("\n"), "utf8");
const tally = results.reduce((a, r) => ((a[r.cf + (r.file121 ? "+1.21.1" : "")] = (a[r.cf + (r.file121 ? "+1.21.1" : "")] || 0) + 1), a), {});
console.log("DONE", JSON.stringify(tally), "total", results.length);
