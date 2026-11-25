
const q = (s) => encodeURIComponent(s);
const facets = encodeURIComponent(JSON.stringify([["versions:1.21.1"],["categories:neoforge"]]));
async function search(query, limit=12) {
  const r = await fetch("https://api.modrinth.com/v2/search?limit=" + limit + "&facets=" + facets + "&query=" + q(query), { headers: { "User-Agent": "dsh-modpack-builder/1.0" } });
  const d = await r.json();
  console.log("\n### " + query + "  (" + d.total_hits + ")");
  for (const h of d.hits) console.log("  " + h.slug.padEnd(42) + " | " + h.title + " | " + (h.description||"").slice(0,90));
}
await search("applied energistics");
await search("applied energistics 2 addon");
await search("extendedae");
await search("mega cells");
await search("ae2 wireless terminal");
await search("applied create");
await search("AE2");
