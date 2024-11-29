import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    `
    User-agent: *
    Allow: /

    Sitemap: https://www.winbet.com/sitemap.xml
    `.trim(),
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
};