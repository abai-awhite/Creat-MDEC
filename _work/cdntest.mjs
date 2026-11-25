
const id = 9335735, name = "Quark-4.1-488.jar";
const a = Math.floor(id / 1000), b = id % 1000;
const urls = [
  "https://mediafilez.forgecdn.net/files/" + a + "/" + b + "/" + encodeURIComponent(name),
  "https://edge.forgecdn.net/files/" + a + "/" + b + "/" + encodeURIComponent(name),
  "https://media.forgecdn.net/files/" + a + "/" + b + "/" + encodeURIComponent(name)
];
for (const u of urls) {
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    const len = r.headers.get("content-length");
    console.log(r.status, len, u);
    if (r.ok) { const b2 = Buffer.from(await r.arrayBuffer()); console.log("  bytes:", b2.length, "magic:", b2.subarray(0, 2).toString()); break; }
  } catch (e) { console.log("FAIL", u, String(e && e.message || e).slice(0, 100)); }
}
