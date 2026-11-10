import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../../site'

// The career story. A sticky year on the left changes as each chapter scrolls past on the right,
// and a rail fills in as you go. Replaces the old dial.
const chapters = [
  { year: '2022', title: 'Rahlah and OptiConnect', role: 'Systems and mobile developer', place: 'Remote', text: 'First products in production: mobile and web systems for travel services and connected business tools.', accent: '#8b9bff' },
  { year: '2023', title: 'TechCircle', role: 'Product', place: 'Lagos', text: 'Built a technology commerce network connecting vendors and customers through digital storefronts.', accent: '#ffad78' },
  { year: '2023', title: 'Lagos State University', role: 'Electronics and Computer Engineering', place: 'Ojo, Lagos', text: 'Engineering fundamentals alongside algorithms, software architecture and computer systems.', accent: '#74c8ed' },
  { year: '2024', title: 'DocTech Global', role: 'Co-founder and Co-CEO', place: 'Lagos and remote', text: 'Co-founded a studio that designs and builds websites, web applications and business software.', accent: '#66e5ab', href: 'https://doctechglobal.com.ng' },
  { year: '2024', title: 'EtelectLabs', role: 'Co-founder and Co-CEO', place: 'Lagos', text: 'Co-founded a product lab for software worth using. Its first product is MedAxis, hospital software from reception to billing.', accent: '#8dcbff', href: 'https://etelectlabs.org' },
  { year: 'Now', title: 'Client systems', role: 'Systems architect and full-stack lead', place: 'Remote', text: 'School platforms, commerce, logistics and AI document tools for clients across West Africa.', accent: '#d2b6ff' },
]

export function Journey() {
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.6', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const chapter = chapters[active]
  return (
    <section id="experience" className="journey" style={{ ['--accent' as string]: chapter.accent }}>
      <div className="section-head">
        <p className="eyebrow">Journey</p>
        <h2>Every chapter changed what I could build.</h2>
      </div>
      <div className="journey-grid">
        <div className="journey-sticky">
          <div className="journey-year" aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={chapter.year + active}
                initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.18, 1] }}
              >
                {chapter.year}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="journey-count">
            Chapter {String(active + 1).padStart(2, '0')} of {String(chapters.length).padStart(2, '0')}
          </p>
          <p className="journey-edu">{profile.education}</p>
        </div>
        <ol ref={list} className="journey-list">
          <span className="journey-rail" aria-hidden="true">
            <motion.span style={{ scaleY: fill }} />
          </span>
          {chapters.map((c, i) => (
            <li
              key={c.title}
              ref={(el) => {
                items.current[i] = el
              }}
              data-i={i}
              className={i === active ? 'chapter is-active' : 'chapter'}
              style={{ ['--c' as string]: c.accent }}
            >
              <span className="chapter-dot" aria-hidden="true" />
              <p className="chapter-meta">
                {c.year} · {c.place}
              </p>
              <h3>{c.title}</h3>
              <p className="chapter-role">{c.role}</p>
              <p className="chapter-text">{c.text}</p>
              {c.href && (
                <a className="link" href={c.href} target="_blank" rel="noreferrer">
                  {c.href.replace(/^https?:\/\//, '')}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* Build activity ------------------------------------------------------------ */

// Real commits, counted per day from his git repositories, public and private (public/activity.json,
// regenerated with scripts/activity.cjs). Stored with the site so it always loads.
type Activity = { generated: string; total: number; repos: number; days: Record<string, number> }
const shades = ['#16191e', '#1d4a36', '#2f7d58', '#5bc28c', '#a6f3cb']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const level = (n: number) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 6 ? 2 : n <= 14 ? 3 : 4)
const iso = (d: Date) => d.toISOString().slice(0, 10)

export function Activity() {
  const [data, setData] = useState<Activity | null>(null)
  const [failed, setFailed] = useState(false)
  const [hover, setHover] = useState<{ date: string; n: number } | null>(null)

  useEffect(() => {
    fetch('/activity.json')
      .then((r) => {
        if (!r.ok) throw new Error('missing')
        return r.json()
      })
      .then(setData)
      .catch(() => setFailed(true))
  }, [])

  // The last 53 weeks, ending on the day the data was generated, in Sunday-first week columns.
  const weeks = useMemo(() => {
    if (!data) return []
    const end = new Date(data.generated + 'T00:00:00Z')
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - 7 * 52 - end.getUTCDay())
    const cols: { date: string; n: number }[][] = []
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      if (d.getUTCDay() === 0) cols.push([])
      const key = iso(d)
      cols[cols.length - 1].push({ date: key, n: data.days[key] ?? 0 })
    }
    return cols
  }, [data])

  const yearDays = weeks.flat()
  const yearTotal = yearDays.reduce((a, d) => a + d.n, 0)
  const activeDays = yearDays.filter((d) => d.n > 0).length
  const best = yearDays.reduce((a, d) => (d.n > a.n ? d : a), { date: '', n: 0 })

  return (
    <div className="activity-card">
      <div className="activity-head">
        <div>
          <h3>Build activity</h3>
          <p>{data ? 'Commits across my repositories, public and private, over the last year.' : failed ? 'Activity is unavailable right now.' : 'Loading activity.'}</p>
        </div>
        <a className="link" href={profile.github} target="_blank" rel="noreferrer">
          github.com/abdul-raham
        </a>
      </div>
      {data && (
        <>
          <div className="activity-stats">
            <div>
              <strong>{yearTotal.toLocaleString()}</strong>
              <span>commits</span>
            </div>
            <div>
              <strong>{activeDays}</strong>
              <span>days with commits</span>
            </div>
            <div>
              <strong>{data.repos}</strong>
              <span>repositories</span>
            </div>
            <div>
              <strong>{best.n}</strong>
              <span>commits on the busiest day</span>
            </div>
          </div>
          <div className="heat-scroll">
            <div className="heat">
              <div className="heat-months" aria-hidden="true">
                {weeks.map((w, i) => {
                  const m = new Date(w[0].date + 'T00:00:00Z').getUTCMonth()
                  const pm = i ? new Date(weeks[i - 1][0].date + 'T00:00:00Z').getUTCMonth() : -1
                  return <span key={i}>{m !== pm ? months[m] : ''}</span>
                })}
              </div>
              <div className="heat-grid" role="img" aria-label={`${yearTotal} commits on ${activeDays} days in the last year`}>
                {weeks.map((w, i) => (
                  <div key={i} className="heat-col">
                    {w.map((d) => (
                      <motion.span
                        key={d.date}
                        className="heat-cell"
                        style={{ background: shades[level(d.n)] }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.008 }}
                        onPointerEnter={() => setHover(d)}
                        onPointerLeave={() => setHover(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="heat-foot">
            <span>
              {hover
                ? `${new Date(hover.date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}: ${hover.n} ${hover.n === 1 ? 'commit' : 'commits'}`
                : 'Point at a day for details'}
            </span>
            <span className="heat-legend">
              Less
              {shades.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
              More
            </span>
          </div>
        </>
      )}
    </div>
  )
}
