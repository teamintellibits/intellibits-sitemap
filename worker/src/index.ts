/**
 * Proxy https://intellibits.io/sitemap.xml to the static asset
 * hosted on Cloudflare Pages (replace PROJECT_NAME below).
 */
const ORIGIN_URL = "https://sitemap-intellibits.pages.dev/sitemap.xml";

export default {
  async fetch(req: Request): Promise<Response> {
    // Only proxy the exact path – everything else should hit Bubble normally.
    if (new URL(req.url).pathname !== "/sitemap.xml") {
      return fetch(req);
    }

    const originResponse = await fetch(ORIGIN_URL, {
      cf: { cacheEverything: true },
      headers: { "User-Agent": "CF-Worker-Sitemap-Proxy/1.0" },
    });

    // Copy status + headers; set explicit content-type and caching.
    const res = new Response(originResponse.body, originResponse);
    res.headers.set("Content-Type", "application/xml; charset=utf-8");
    res.headers.set("Cache-Control", "public, max-age=900"); // 15 min

    return res;
  },
};
