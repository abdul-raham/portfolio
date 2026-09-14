import { useEffect, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { ReflectiveCard } from './ReflectiveCard'

type Day = { date: string; level: number }
const colors = ['#1b2227', '#0e4429', '#006d32', '#26a641', '#39d353']

export function GithubContributions() {
  const [days, setDays] = useState<Day[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/github-contributions', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Unavailable'); return response.json() })
      .then((data: { days: Day[] }) => { if (!Array.isArray(data.days)) throw new Error('Invalid data'); setDays(data.days) })
      .catch((reason) => { if (reason.name !== 'AbortError') setError(true) })
    return () => controller.abort()
  }, [])

  const weeks: Day[][] = []
  if (days) {
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  }

  return (
    <ReflectiveCard style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}><Github size={20} color="#39d353" /> GitHub activity</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '.86rem', marginTop: '.3rem' }}>Live contribution levels from my public GitHub profile.</p>
        </div>
        <a href="https://github.com/abdul-raham" target="_blank" rel="noopener noreferrer" style={{ color: '#b8d9c4', display: 'inline-flex', alignItems: 'center', gap: '.3rem', textDecoration: 'none', fontSize: '.82rem' }}>View profile <ArrowUpRight size={15} /></a>
      </div>
      {days ? (
        <>
          <div role="img" aria-label={`GitHub contribution calendar for ${days[0]?.date} through ${days[days.length - 1]?.date}`} style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '.5rem' }}>
            {weeks.map((week, index) => <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 auto' }}>{week.map((day) => <span key={day.date} title={`${day.date}: contribution level ${day.level}`} style={{ width: '11px', height: '11px', borderRadius: '2px', background: colors[day.level] ?? colors[0] }} />)}</div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '.9rem', color: 'var(--text-tertiary)', fontSize: '.73rem' }}>
            <span>{days[0]?.date} — {days[days.length - 1]?.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Less {colors.map((color) => <i key={color} style={{ width: '10px', height: '10px', borderRadius: '2px', background: color }} />)} More</span>
          </div>
        </>
      ) : <p style={{ color: 'var(--text-secondary)', fontSize: '.88rem' }}>{error ? 'Live activity is unavailable right now. Open GitHub to see the latest calendar.' : 'Loading GitHub activity…'}</p>}
    </ReflectiveCard>
  )
}
