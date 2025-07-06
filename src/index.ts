export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      // Serve the sitemap from Cloudflare Pages (or another static host)
      return fetch("https://b7e3afa323246b07ffc8460275e35930.cdn.bubble.io/f1751820484214x179185465120865300/sitemap.xml", {
        headers: {
          'Content-Type': 'application/xml'
        }
      });
    }

    // Forward everything else to Bubble
    return fetch(request);
  }
}
