
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
async function versionOf(slug) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq, { headers: UA });
  if (!r.ok) return null;
  const a = await r.json();
  return a.length ? a[0] : null;
}
const slugs = ["caelus", "owo-lib", "coroutil", "create-solar", "createsolar", "citadelup", "alexscavesup"];
for (const s of slugs) {
  const v = await versionOf(s);
  console.log(s.padEnd(16), v ? v.version_number + "  " + v.files[0].filename : "NO 1.21.1");
}
