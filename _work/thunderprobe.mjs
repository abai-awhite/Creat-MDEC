
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
for (const s of ["thunderbolt", "aci"]) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + s, { headers: UA });
  console.log("==", s, "project", r.status);
  if (!r.ok) continue;
  const p = await r.json();
  console.log("   title:", p.title, "| loaders:", (p.loaders || []).join(","));
  const vr = await fetch("https://api.modrinth.com/v2/project/" + s + "/version?" + vq, { headers: UA });
  const a = vr.ok ? await vr.json() : [];
  console.log("   1.21.1-neoforge 版本:", a.length);
  for (const v of a.slice(0, 4)) console.log("   -", v.version_number, v.files.map((f) => f.filename + "(" + (f.size / 1048576).toFixed(2) + "MB)").join(", "));
}
