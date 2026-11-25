
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads");
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const slugs = ["aci", "thunderbolt", "experiencelib", "polylib", "tenshilib", "oelib", "kotlinforforge"];
for (const s of slugs) {
  try {
    const vr = await fetch("https://api.modrinth.com/v2/project/" + s + "/version?" + vq, { headers: UA });
    if (!vr.ok) { console.log(s.padEnd(16), "project", vr.status); continue; }
    const a = await vr.json();
    if (!a.length) { console.log(s.padEnd(16), "no-1.21.1"); continue; }
    const v = a[0];
    const f = v.files.find((x) => x.primary) || v.files[0];
    const out = path.join(dlDir, f.filename);
    if (fs.existsSync(out)) { console.log(s.padEnd(16), "exists", f.filename); continue; }
    const fr = await fetch(f.url, { headers: UA });
    if (!fr.ok) { console.log(s.padEnd(16), "download", fr.status); continue; }
    const buf = Buffer.from(await fr.arrayBuffer());
    fs.writeFileSync(out, buf);
    console.log(s.padEnd(16), v.version_number, f.filename, (buf.length / 1048576).toFixed(2) + "MB");
  } catch (e) { console.log(s.padEnd(16), "FAIL", String(e && e.message || e).slice(0, 80)); }
}
