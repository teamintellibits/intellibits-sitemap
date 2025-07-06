export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      const sitemapURL = "https://b7e3afa323246b07ffc8460275e35930.cdn.bubble.io/f1751820484214x179185465120865300/sitemap.xml"; // Your hosted XML file
      const response = await fetch(sitemapURL);

      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
