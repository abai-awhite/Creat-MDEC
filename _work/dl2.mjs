
import fs from "node:fs";
import path from "node:path";
const work = process.cwd() + path.sep + "_work";
const res = JSON.parse(fs.readFileSync(path.join(work, "unknown-resolved2.json"), "utf8"));
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0" };
const dlDir = path.join(work, "downloads-cf");
fs.mkdirSync(dlDir, { recursive: true });
for (const r of res) {
  if (!r.cf || !r.cf.file121) continue;
  const id = r.cf.fileId;
  const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(id / 1000) + "/" + (id % 1000) + "/" + encodeURIComponent(r.cf.file121);
  const out = path.join(dlDir, r.cf.file121);
  if (fs.existsSync(out)) { console.log("exists", r.cf.file121); continue; }
  const fr = await fetch(url, { headers: UA });
  if (!fr.ok) { console.log("fail", fr.status, r.cf.file121); continue; }
  const buf = Buffer.from(await fr.arrayBuffer());
  fs.writeFileSync(out, buf);
  console.log("OK", r.cf.file121, (buf.length / 1048576).toFixed(1) + "MB");
}
