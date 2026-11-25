
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const r = await fetch("https://api.modrinth.com/v2/project/ae2-lightning-tech/version?" + vq, { headers: UA });
const a = await r.json();
const v = a[0];
console.log("ae2lt", v.version_number, v.files.map(f => f.filename).join(","));
for (const d of v.dependencies || []) {
  let title = d.project_id;
  try {
    const pr = await fetch("https://api.modrinth.com/v2/project/" + d.project_id, { headers: UA });
    if (pr.ok) { const p = await pr.json(); title = p.slug + " (" + p.title + ")"; }
  } catch {}
  console.log(" dep", d.dependency_type, title, d.version_id ? "vid=" + d.version_id : "");
}
