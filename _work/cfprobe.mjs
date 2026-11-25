
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) dsh-modpack-builder/1.0", "Accept": "application/json" };
async function probe(name, url) {
  try {
    const r = await fetch(url, { headers: UA });
    const txt = await r.text();
    console.log("== " + name + "  HTTP " + r.status + "  len " + txt.length);
    console.log(txt.slice(0, 400).replace(/\s+/g, " "));
  } catch (e) { console.log("== " + name + " FAIL " + String(e && e.message || e)); }
  console.log();
}
await probe("cfwidget ae2", "https://api.cfwidget.com/minecraft/mc-mods/applied-energistics-2");
await probe("cfwidget tetra", "https://api.cfwidget.com/minecraft/mc-mods/tetra");
await probe("curseforge api", "https://api.curseforge.com/v1/mods/search?gameId=432&searchFilter=applied");
await probe("curseforge page", "https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2");
