
const UA = { "User-Agent": "dsh-modpack-builder/1.0" };
const q = (s) => encodeURIComponent(s);
const vq = "game_versions=" + q('["1.21.1"]') + "&loaders=" + q('["neoforge"]');
const slugs = [
  "ae2", "applied-energistics-2-wireless-terminals", "extended-ae", "extendedae-plus", "mega",
  "glodium", "applied-create", "ae2-omni-cells", "ae2-import-export-card", "ae2-wcwt",
  "assembler-matrix-prioritization", "ae2-qol-recipes"
];
for (const slug of slugs) {
  const r = await fetch("https://api.modrinth.com/v2/project/" + slug + "/version?" + vq, { headers: UA });
  if (!r.ok) { console.log(slug.padEnd(40), "HTTP", r.status); continue; }
  const arr = await r.json();
  if (!arr.length) { console.log(slug.padEnd(40), "NO 1.21.1-neoforge"); continue; }
  const v = arr[0];
  console.log(slug.padEnd(40), v.version_number.padEnd(22), v.files[0].filename, (v.files[0].size/1048576).toFixed(1) + "MB");
}
// CDN test
const test = await fetch("https://cdn.modrinth.com/data/XxWD5pD3/versions/7Ac6mXbf/appliedenergistics2-19.2.20.jar", { headers: UA, method: "GET" });
console.log("CDN test status", test.status, "len", test.headers.get("content-length"));
