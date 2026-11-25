
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const work = path.join(root, "_work");
const dlDir = path.join(work, "downloads-cf");
fs.mkdirSync(dlDir, { recursive: true });
const rows = JSON.parse(fs.readFileSync(path.join(work, "cf-scan.json"), "utf8")).filter((r) => r.file121);
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0" };
let ok = 0, fail = 0;
for (const r of rows) {
  const id = r.fileId;
  if (!id) { console.log("no id", r.file121); fail++; continue; }
  const a = Math.floor(id / 1000), b = id % 1000;
  const url = "https://mediafilez.forgecdn.net/files/" + a + "/" + b + "/" + encodeURIComponent(r.file121);
  const out = path.join(dlDir, r.file121);
  if (fs.existsSync(out)) { console.log("exists", r.file121); ok++; continue; }
  try {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.log("HTTP", res.status, r.file121); fail++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(out, buf);
    console.log("OK", r.file121, (buf.length/1048576).toFixed(1) + "MB");
    ok++;
  } catch (e) { console.log("FAIL", r.file121, String(e && e.message || e).slice(0, 80)); fail++; }
}
console.log("DONE download ok=" + ok, "fail=" + fail);
