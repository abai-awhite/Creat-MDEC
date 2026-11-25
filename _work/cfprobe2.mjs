
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const slugs = ["thunderbolt", "thunderbolt-lib", "ae2-thunderbolt", "aci", "advanced-custom-items", "amais-custom-items"];
for (const slug of slugs) {
  try {
    const r = await fetch("https://api.cfwidget.com/minecraft/mc-mods/" + slug, { headers: UA });
    if (!r.ok) { console.log(slug.padEnd(24), "CF-" + r.status); continue; }
    const j = await r.json();
    const neo = (j.files || []).filter((f) => (f.versions || []).includes("1.21.1") && (f.versions || []).some((v) => /NeoForge/i.test(v)));
    console.log(slug.padEnd(24), j.title, "| 1.21.1-NeoForge:", neo.length ? neo[0].name : "无", "| files:", (j.files || []).length);
  } catch (e) { console.log(slug.padEnd(24), "FAIL"); }
}
