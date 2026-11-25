
import fs from "node:fs";
import path from "node:path";
const dlDir = process.cwd() + path.sep + "_work" + path.sep + "downloads";
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const r = await fetch("https://api.cfwidget.com/minecraft/mc-mods/thunderbolt-lib", { headers: UA });
const j = await r.json();
const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
neo.sort((a, b) => String(b.uploaded_at || "").localeCompare(String(a.uploaded_at || "")));
const f = neo[0];
const url = "https://mediafilez.forgecdn.net/files/" + Math.floor(f.id / 1000) + "/" + (f.id % 1000) + "/" + encodeURIComponent(f.name);
const fr = await fetch(url, { headers: UA });
const buf = Buffer.from(await fr.arrayBuffer());
fs.writeFileSync(path.join(dlDir, f.name), buf);
console.log("OK", f.name, (buf.length / 1024).toFixed(0) + "KB");
