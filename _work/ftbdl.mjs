
import fs from "node:fs";
import path from "node:path";
const dlDir = process.cwd() + path.sep + "_work" + path.sep + "downloads3";
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const slugs = ["ftb-library", "ftb-quests", "ftb-teams", "ftb-ultimine", "ftb-xmod-compat", "ftb-essentials", "ftb-ranks", "ftb-chunks", "ftb-filter-system", "ftb-money", "ftb-quests-localizer", "ftb-chunks-x-xaeros-compat"];
for (const s of slugs) {
  try {
    const pr = await fetch("https://api.modrinth.com/v2/project/" + s, { headers: UA });
    if (!pr.ok) { console.log(s.padEnd(28), "project", pr.status); continue; }
    const p = await pr.json();
    const vr = await fetch("https://api.modrinth.com/v2/project/" + s + "/version?" + vq, { headers: UA });
    const a = vr.ok ? await vr.json() : [];
    if (!a.length) { console.log(s.padEnd(28), p.title, "NO-1.21.1"); continue; }
    const v = a[0];
    const f = v.files.find((x) => x.primary) || v.files[0];
    const out = path.join(dlDir, f.filename);
    if (fs.existsSync(out)) { console.log(s.padEnd(28), p.title, "exists", f.filename); continue; }
    const fr = await fetch(f.url, { headers: UA });
    const buf = Buffer.from(await fr.arrayBuffer());
    fs.writeFileSync(out, buf);
    console.log(s.padEnd(28), p.title, v.version_number, f.filename, (buf.length / 1048576).toFixed(1) + "MB");
  } catch (e) { console.log(s.padEnd(28), "FAIL", String(e && e.message || e).slice(0, 80)); }
}
