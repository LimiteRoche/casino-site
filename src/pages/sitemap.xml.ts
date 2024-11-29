import type { APIRoute } from 'astro';

const pages = [
  '',
  'about',
  'responsible-gaming',
  'terms',
  'privacy',
  'sports',
  'casino',
  'live-casino',
  'promotions',
  'faq',
  'contact',
  'banking',
  'security'
];

export const GET: APIRoute = async () => {
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => `
        <url>
          <loc>https://www.winbet.com/${page}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        </url>
      `).join('')}
    </urlset>
    `.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
};