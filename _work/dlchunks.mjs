
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dlDir = path.join(root, "_work", "downloads4");
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const j = await (await fetch("https://api.cfwidget.com/minecraft/mc-mods/ftb-chunks", { headers: UA })).json();
const f = (j.files || []).find((x) => x.name === "ftb-chunks-neoforge-2101.1.20.jar");
if (!f) { console.log("NOT FOUND"); process.exit(1); }
const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name);
const r = await fetch(url, { headers: UA });
const buf = Buffer.from(await r.arrayBuffer());
fs.writeFileSync(path.join(dlDir, f.name), buf);
console.log("OK", f.name, (buf.length / 1048576).toFixed(2) + "MB");
