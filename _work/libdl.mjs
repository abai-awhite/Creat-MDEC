
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads");
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
for (const slug of ["caelus", "owo-lib", "coroutil"]) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq, { headers: UA });
  const a = await r.json();
  const v = a[0];
  const f = v.files.find((x) => x.primary) || v.files[0];
  const out = path.join(dlDir, f.filename);
  if (fs.existsSync(out)) { console.log("exists", f.filename); continue; }
  const fr = await fetch(f.url, { headers: UA });
  const buf = Buffer.from(await fr.arrayBuffer());
  fs.writeFileSync(out, buf);
  console.log("OK", slug, v.version_number, f.filename, (buf.length/1024).toFixed(0) + "KB");
}
