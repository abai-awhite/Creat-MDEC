
const UA = { "User-Agent": "Mozilla/5.0 dsh-modpack-builder/1.0", "Accept": "application/json" };
const r = await fetch("https://api.cfwidget.com/minecraft/mc-mods/quark", { headers: UA });
const j = await r.json();
console.log("keys:", Object.keys(j).join(","));
console.log("title:", j.title, "| id:", j.id, "| downloads:", j.downloads?.total);
const files = j.files || [];
console.log("files:", files.length);
console.log("sample file:", JSON.stringify(files[0], null, 1).slice(0, 800));
const v121 = files.filter(f => (f.versions || []).includes("1.21.1"));
console.log("\n1.21.1 files:", v121.length);
console.log(JSON.stringify(v121.slice(0,3), null, 1).slice(0, 1500));
