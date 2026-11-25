
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads");
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const targets = ["supermartijn642s-core-lib", "supermartijn642s-config-lib"];
for (const slug of targets) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq, { headers: UA });
  if (!r.ok) { console.log("project fail", slug, r.status); continue; }
  const a = await r.json();
  if (!a.length) { console.log("no version", slug); continue; }
  const v = a[0];
  const f = v.files.find((x) => x.primary) || v.files[0];
  const fr = await fetch(f.url, { headers: UA });
  const buf = Buffer.from(await fr.arrayBuffer());
  fs.writeFileSync(path.join(dlDir, f.filename), buf);
  console.log("OK", slug, v.version_number, f.filename, (buf.length/1048576).toFixed(2) + "MB");
}
