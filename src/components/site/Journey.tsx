import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../../site'

// The career story. A sticky year on the left changes as each chapter scrolls past on the right,
// and a rail fills in as you go. Replaces the old dial.
const chapters = [
  { year: '2022', title: 'Rahlah and OptiConnect', role: 'Systems and mobile developer', place: 'Remote', text: 'First products in production: mobile and web systems for travel services and connected business tools.', accent: '#8b9bff' },
  { year: '2023', title: 'TechCircle', role: 'Founder and CEO', place: 'Lagos', text: 'Started a technology commerce network connecting vendors and customers through digital storefronts.', accent: '#ffad78' },
  { year: '2023', title: 'Lagos State University', role: 'Electronics and Computer Engineering', place: 'Ojo, Lagos', text: 'Engineering fundamentals alongside algorithms, software architecture and computer systems.', accent: '#74c8ed' },
  { year: '2024', title: 'DocTech Global', role: 'Co-Founder and Lead Engineer', place: 'Lagos and remote', text: 'Leading the technical side of a studio that designs and builds websites, web applications and business software.', accent: '#66e5ab', href: 'https://doctechglobal.com.ng' },
  { year: '2024', title: 'MedAxis and EtelectLabs', role: 'Founder, and co-founder', place: 'Lagos', text: 'Hospital software from reception to billing, built inside EtelectLabs, a product lab for software worth using.', accent: '#8dcbff', href: 'https://medaxis.com.ng' },
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

/* GitHub activity ----------------------------------------------------------- */

type Day = { date: string; level: number }
const shades = ['#16191e', '#1d4a36', '#2f7d58', '#5bc28c', '#a6f3cb']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function Activity() {
  const [days, setDays] = useState<Day[] | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)
  const [hover, setHover] = useState<Day | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/github-contributions', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('unavailable')
        return r.json()
      })
      .then((data: { days: Day[]; total?: number }) => {
        if (!Array.isArray(data.days) || data.days.length < 300) throw new Error('bad data')
        setDays(data.days)
        setTotal(typeof data.total === 'number' ? data.total : null)
      })
      .catch((e) => e.name !== 'AbortError' && setFailed(true))
    return () => controller.abort()
  }, [])

  // GitHub lists the calendar row by row (all Sundays, then all Mondays...). Sort by date, then lay the
  // days into week columns starting on Sunday, so the grid matches GitHub's own.
  const weeks = useMemo(() => {
    if (!days) return []
    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
    const cols: (Day | null)[][] = []
    let col: (Day | null)[] = Array(new Date(sorted[0].date + 'T00:00:00Z').getUTCDay()).fill(null)
    sorted.forEach((d) => {
      col.push(d)
      if (col.length === 7) {
        cols.push(col)
        col = []
      }
    })
    if (col.length) cols.push(col)
    return cols
  }, [days])

  const activeDays = days ? days.filter((d) => d.level > 0).length : 0

  return (
    <div className="activity-card">
      <div className="activity-head">
        <div>
          <h3>GitHub activity</h3>
          <p>
            {days
              ? total !== null
                ? `${total.toLocaleString()} contributions across ${activeDays} active days in the last year.`
                : `${activeDays} active days in the last year.`
              : failed
                ? 'Live activity is unavailable right now.'
                : 'Loading live activity from GitHub.'}
          </p>
        </div>
        <a className="link" href={profile.github} target="_blank" rel="noreferrer">
          github.com/abdul-raham
        </a>
      </div>
      {weeks.length > 0 && (
        <>
          <div className="heat-scroll">
            <div className="heat">
              <div className="heat-months" aria-hidden="true">
                {weeks.map((w, i) => {
                  const first = w.find(Boolean)
                  const prev = weeks[i - 1]?.find(Boolean)
                  const m = first ? new Date(first.date + 'T00:00:00Z').getUTCMonth() : -1
                  const pm = prev ? new Date(prev.date + 'T00:00:00Z').getUTCMonth() : -2
                  return <span key={i}>{m !== pm && m >= 0 ? months[m] : ''}</span>
                })}
              </div>
              <div className="heat-grid" role="img" aria-label={`GitHub contribution calendar, ${activeDays} active days in the last year`}>
                {weeks.map((w, i) => (
                  <div key={i} className="heat-col">
                    {w.map((d, j) =>
                      d ? (
                        <motion.span
                          key={d.date}
                          className="heat-cell"
                          style={{ background: shades[d.level] ?? shades[0] }}
                          initial={{ opacity: 0, scale: 0.4 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.008 }}
                          onPointerEnter={() => setHover(d)}
                          onPointerLeave={() => setHover(null)}
                        />
                      ) : (
                        <span key={`e${j}`} className="heat-cell is-empty" />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="heat-foot">
            <span>
              {hover
                ? `${new Date(hover.date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}: ${['No', 'Some', 'Steady', 'High', 'Very high'][hover.level]} activity`
                : 'Point at a day for details'}
            </span>
            <span className="heat-legend">
              Less
              {shades.map((s) => (
                <i key={s} style={{ background: s }} />
              ))}
              More
            </span>
          </div>
        </>
      )}
    </div>
  )
}
