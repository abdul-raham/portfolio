const SOURCE = 'https://github.com/users/abdul-raham/contributions'

export default async function handler(_request, response) {
  try {
    const result = await fetch(SOURCE, { headers: { 'User-Agent': 'portfolio-contributions/1.0', Accept: 'text/html' } })
    if (!result.ok) throw new Error(`GitHub returned ${result.status}`)
    const html = await result.text()
    const days = [...html.matchAll(/<td\b[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"[^>]*>/g)]
      .map((match) => ({ date: match[1], level: Number(match[2]) }))
    if (days.length < 300) throw new Error('GitHub calendar format changed')
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    response.status(200).json({ source: SOURCE, days })
  } catch (_error) {
    response.status(503).json({ error: 'Live GitHub activity is temporarily unavailable' })
  }
}
