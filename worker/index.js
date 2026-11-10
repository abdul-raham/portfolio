// Cloudflare Worker for the portfolio. It serves the built site, plus one live endpoint:
// /api/github-contributions, which reads the public GitHub contribution calendar.
// (This replaces the Vercel function in api/github-contributions.js.)
const SOURCE = 'https://github.com/users/abdul-raham/contributions';

async function contributions(ctx) {
  const cache = caches.default;
  const key = new Request(SOURCE);
  const cached = await cache.match(key);
  if (cached) return cached;
  try {
    const result = await fetch(SOURCE, { headers: { 'User-Agent': 'portfolio-contributions/1.0', Accept: 'text/html' } });
    if (!result.ok) throw new Error(`GitHub returned ${result.status}`);
    const html = await result.text();
    const days = [...html.matchAll(/<td\b[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"[^>]*>/g)].map(
      (match) => ({ date: match[1], level: Number(match[2]) }),
    );
    if (days.length < 300) throw new Error('GitHub calendar format changed');
    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : null;
    const response = Response.json(
      { source: SOURCE, days, total },
      { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
    );
    ctx.waitUntil(cache.put(key, response.clone()));
    return response;
  } catch {
    return Response.json({ error: 'Live GitHub activity is temporarily unavailable' }, { status: 503 });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/github-contributions') return contributions(ctx);
    return env.ASSETS.fetch(request);
  },
};
