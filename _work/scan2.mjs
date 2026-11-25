
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const modsDir = path.join(root, "versions", "Create-Delight-Remake", "mods");
const UA = "dsh-modpack-builder/1.0";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const spaced = (s) => String(s || "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();

function zipEntries(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 70000); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) return [];
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    out.push({ name: buf.subarray(p + 46, p + 46 + nlen).toString("utf8"), method: buf.readUInt16LE(p + 10), csize: buf.readUInt32LE(p + 20), lho: buf.readUInt32LE(p + 42) });
    p += 46 + nlen + elen + clen;
  }
  return out;
}
function readEntry(buf, e) {
  const ln = buf.readUInt16LE(e.lho + 26), le = buf.readUInt16LE(e.lho + 28);
  const start = e.lho + 30 + ln + le;
  const raw = buf.subarray(start, start + e.csize);
  try { return e.method === 0 ? raw : zlib.inflateRawSync(raw); } catch { return null; }
}
function parseMeta(toml) {
  let modId = "", display = "";
  let section = "";
  for (const raw of toml.split(/\r?\n/)) {
    const line = raw.trim();
    const sec = line.match(/^\[\[([^\]]+)\]\]/);
    if (sec) { section = sec[1].trim(); continue; }
    if (line.startsWith("[")) { section = ""; continue; }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/);
    if (!kv) continue;
    if (section === "mods") {
      if (kv[1] === "modId" && !modId) modId = kv[2] ?? kv[3] ?? "";
      else if (kv[1] === "displayName" && !display) display = kv[2] ?? kv[3] ?? "";
    }
  }
  return { modId, display };
}

const jars = fs.readdirSync(modsDir).filter((f) => f.toLowerCase().endsWith(".jar")).sort();
const mods = [];
for (const jar of jars) {
  try {
    const buf = fs.readFileSync(path.join(modsDir, jar));
    const es = zipEntries(buf);
    const cand = es.filter((e) => /^META-INF\/(neoforge\.)?mods\.toml$/i.test(e.name));
    if (!cand.length) { mods.push({ jar, modId: "", display: "" }); continue; }
    const data = readEntry(buf, cand[0]);
    const p = parseMeta(data ? data.toString("utf8") : "");
    mods.push({ jar, ...p });
  } catch (e) { mods.push({ jar, modId: "", display: "" }); }
}
console.log("parsed jars:", mods.length, "| with modId:", mods.filter((m) => m.modId).length);

async function getJson(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429 || r.status === 503) { await sleep(1200 * (i + 1)); continue; }
      if (r.status === 404) return { status: 404 };
      if (!r.ok) return { status: r.status };
      return { status: 200, data: await r.json() };
    } catch (e) { await sleep(700 * (i + 1)); }
  }
  return { status: -1 };
}
const vq = "game_versions=" + encodeURIComponent('["1.21.1"]') + "&loaders=" + encodeURIComponent('["neoforge"]');

async function resolveSlug(modId, display) {
  const cands = [modId, modId.replace(/_/g, "-").toLowerCase()];
  for (const c of cands) {
    if (!c) continue;
    const r = await getJson("https://api.modrinth.com/v2/project/" + encodeURIComponent(c));
    if (r.status === 200 && r.data?.slug) return { slug: r.data.slug, title: r.data.title };
  }
  const q = display || spaced(modId);
  if (!q) return null;
  const r = await getJson("https://api.modrinth.com/v2/search?limit=10&query=" + encodeURIComponent(q));
  if (r.status !== 200 || !r.data) return null;
  const keyId = norm(modId), keyName = norm(display || " " + modId);
  let best = null, bestScore = 0;
  for (const h of r.data.hits || []) {
    const s1 = norm(h.slug), s2 = norm(h.title);
    let sc = 0;
    if (s1 === keyId) sc = 1;
    else if (s2 === keyName) sc = 0.98;
    else if (keyId && (s1.includes(keyId) || keyId.includes(s1)) && keyId.length >= 5) sc = 0.9;
    else if (keyName && (s2.includes(keyName) || keyName.includes(s2)) && keyName.length >= 6) sc = 0.85;
    if (sc > bestScore) { bestScore = sc; best = h; }
  }
  return bestScore >= 0.85 ? { slug: best.slug, title: best.title } : null;
}

const results = [];
let done = 0;
async function one(m) {
  const row = { file: m.jar, modId: m.modId, display: m.display, status: "error", slug: null, title: null, version: null, filename: null, url: null };
  try {
    if (!m.modId) { row.status = "no-modid"; }
    else {
      const proj = await resolveSlug(m.modId, m.display);
      if (!proj) row.status = "not-on-modrinth";
      else {
        row.slug = proj.slug; row.title = proj.title;
        const v = await getJson("https://api.modrinth.com/v2/project/" + encodeURIComponent(proj.slug) + "/version?" + vq);
        if (v.status === 200 && Array.isArray(v.data) && v.data.length) {
          row.status = "available";
          row.version = v.data[0].version_number;
          row.filename = v.data[0].files?.[0]?.filename;
          row.url = v.data[0].files?.[0]?.url;
        } else row.status = "no-1.21.1";
      }
    }
  } catch (e) { row.status = "error"; row.err = String(e && e.message || e).slice(0, 120); }
  results.push(row);
  done++;
  if (done % 20 === 0) console.log("progress", done, "/", mods.length, "available:", results.filter((r) => r.status === "available").length);
}

const CONC = 4;
let idx = 0;
await Promise.all(Array.from({ length: CONC }, async () => {
  while (idx < mods.length) {
    const m = mods[idx++];
    await one(m);
    await sleep(60);
  }
}));
results.sort((a, b) => a.file.localeCompare(b.file));
fs.writeFileSync(path.join(root, "_work", "cdr-avail2.json"), JSON.stringify(results, null, 1), "utf8");
const esc = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(root, "_work", "cdr-avail2.csv"), ["file,modId,display,status,slug,version"].join(",") + "\n" + results.map((r) => [r.file, r.modId, r.display, r.status, r.slug, r.version].map(esc).join(",")).join("\n"), "utf8");
const tally = results.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
console.log("DONE", JSON.stringify(tally));
