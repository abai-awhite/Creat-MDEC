
import fs from "node:fs";
import path from "node:path";
const dlDir = process.cwd() + path.sep + "_work" + path.sep + "downloads";
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const r = await fetch("https://api.modrinth.com/v2/project/thunderbolt-core/version?" + vq, { headers: UA });
if (!r.ok) { console.log("HTTP", r.status); process.exit(0); }
const a = await r.json();
const v = a[0];
const f = v.files.find((x) => x.primary) || v.files[0];
const fr = await fetch(f.url, { headers: UA });
const buf = Buffer.from(await fr.arrayBuffer());
fs.writeFileSync(path.join(dlDir, f.filename), buf);
console.log("OK", v.version_number, f.filename, (buf.length / 1024).toFixed(0) + "KB");
