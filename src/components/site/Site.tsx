import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { featuredProjects, otherProjects, productProjects, profile, projects, skills, stats, ventures, type Project } from '../../site'
import { scrollToTarget, stopScroll } from '../../smooth'
import { Activity } from './Journey'

const EASE = [0.76, 0, 0.18, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

// A line of type that rises from behind its own edge.
export function Rise({ children, delay = 0, inView = false }: { children: ReactNode; delay?: number; inView?: boolean }) {
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.5 } } : { animate: 'show' }
  return (
    <motion.span className="rise" initial="hide" {...trigger}>
      <motion.span variants={{ hide: { y: '110%' }, show: { y: 0 } }} transition={{ duration: 1, ease: EASE, delay }}>
        {children}
      </motion.span>
    </motion.span>
  )
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* Top bar ---------------------------------------------------------------- */

// Hides on the way down, returns on the way up, and gets a solid background once off the top.
export function TopBar({ onSearch }: { onSearch: () => void }) {
  const bar = useRef<HTMLElement>(null)
  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const el = bar.current
      if (!el) return
      const y = window.scrollY
      if (Math.abs(y - last) > 4) {
        el.classList.toggle('is-away', y > last && y > window.innerHeight * 0.6)
        last = y
      }
      el.classList.toggle('is-solid', y > 24)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  const links = [
    ['Companies', '#ventures'],
    ['Products', '#products'],
    ['Work', '#work'],
    ['Journey', '#experience'],
    ['Contact', '#contact'],
  ]
  return (
    <header ref={bar} className="bar">
      <a
        className="bar-name"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget(0)
        }}
      >
        {profile.short}
      </a>
      <nav aria-label="Main">
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget(href)
            }}
          >
            {label}
          </a>
        ))}
        <button type="button" className="bar-search" onClick={onSearch} aria-label="Search projects (Ctrl K)">
          Search <kbd>Ctrl K</kbd>
        </button>
      </nav>
    </header>
  )
}

/* Hero ------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section id="top" ref={ref} className="hero">
      <motion.figure
        className="hero-photo"
        style={{ y: photoY, scale: photoScale }}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
      >
        <img src="/abdulrahman.webp" width={960} height={1280} alt={`Portrait of ${profile.name}`} />
      </motion.figure>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.p className="hero-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <span className="dot" /> {profile.role}, {profile.location}
        </motion.p>
        <h1>
          <Rise delay={0.15}>{profile.first}</Rise>
          <Rise delay={0.25}>{profile.last}</Rise>
        </h1>
        <motion.div className="hero-foot" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
          <p>
            Co-founder and Co-CEO of <strong>DocTech Global</strong> and <strong>EtelectLabs</strong>. Builder of{' '}
            <strong>MedAxis</strong>, <strong>TechCircle</strong> and the products below.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-solid"
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#work')
              }}
            >
              See the work
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              Start a conversation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* Intro and numbers -------------------------------------------------------- */

function Count({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!seen) return
    const run = animate(0, to, { duration: 1.3, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => run.stop()
  }, [seen, to])
  return (
    <div ref={ref} className="count">
      <strong aria-label={`${to}${suffix}`}>
        {value}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

function Word({ word, progress, start, end }: { word: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

export function Intro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const words = profile.intro.split(' ')
  return (
    <section ref={ref} className="intro">
      <p className="eyebrow">About</p>
      <p className="intro-text" aria-label={profile.intro}>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} start={i / words.length} end={(i + 2) / words.length} />
        ))}
      </p>
      <div className="intro-meta">
        <div className="counts">
          {stats.map((s) => (
            <Count key={s.label} to={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
        <p className="intro-edu">{profile.education}</p>
      </div>
    </section>
  )
}

/* Ventures --------------------------------------------------------------- */

export function Ventures() {
  return (
    <section id="ventures" className="ventures">
      <div className="section-head">
        <p className="eyebrow">Companies</p>
        <h2>
          <Rise inView>Two companies, one way of building.</Rise>
        </h2>
      </div>
      <div className="ventures-grid">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.08} className="venture-cell">
            <article className="venture">
              <div className="venture-top">
                <img src={v.logo} alt="" width={64} height={64} />
                <span>Since {v.since}</span>
              </div>
              <h3>{v.name}</h3>
              <p className="venture-role">{v.role}</p>
              <p className="venture-text">{v.text}</p>
              <div className="venture-links">
                <a className="link" href={v.href} target="_blank" rel="noreferrer">
                  {v.href.replace(/^https?:\/\//, '')}
                </a>
                <a className="link" href={`mailto:${v.email}`}>
                  {v.email}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Products -------------------------------------------------------------- */

export function Products({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="products" className="products">
      <div className="section-head">
        <p className="eyebrow">Products</p>
        <h2>
          <Rise inView>Products I&rsquo;ve built.</Rise>
        </h2>
      </div>
      <div className="products-grid">
        {productProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="product-cell">
            <button type="button" className="product" onClick={() => onOpen(p)}>
              {p.image ? (
                <Browser project={p} />
              ) : (
                <div className="product-mark">
                  <img src={p.logoPath} alt="" width={160} height={160} />
                </div>
              )}
              <div className="product-text">
                <div>
                  <h3>{p.title}</h3>
                  <p className="work-kind">{p.kind ?? p.category}</p>
                </div>
                <p className="work-summary">{p.summary}</p>
                <span className="link">{p.liveUrl ? `Visit ${p.domain}` : 'Project details'}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Selected work ------------------------------------------------------------ */

function Browser({ project }: { project: Project }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{project.domain}</span>
      </div>
      <img src={project.image} width={1440} height={900} alt={`Screenshot of ${project.title}, ${project.domain}`} loading="lazy" />
    </div>
  )
}

function WorkRow({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  return (
    <article ref={ref} className={index % 2 ? 'work-row is-flipped' : 'work-row'}>
      <motion.button type="button" className="work-shot" style={{ y }} onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}>
        <Browser project={project} />
      </motion.button>
      <Reveal className="work-text">
        <span className="work-n">
          {pad(index + 1)} / {pad(featuredProjects.length)}
        </span>
        <h3>{project.title}</h3>
        <p className="work-kind">{project.kind}</p>
        <p className="work-summary">{project.summary}</p>
        <div className="work-actions">
          <button type="button" className="link" onClick={() => onOpen(project)}>
            Project details
          </button>
          {project.liveUrl && (
            <a className="link" href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit live site
            </a>
          )}
        </div>
      </Reveal>
    </article>
  )
}

export function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="work" className="work">
      <div className="section-head">
        <p className="eyebrow">Client and partner work</p>
        <h2>
          <Rise inView>Built for the people who run on it.</Rise>
        </h2>
        <p className="section-sub">Every screenshot here is the real site, captured from its live address.</p>
      </div>
      {featuredProjects.map((p, i) => (
        <WorkRow key={p.id} project={p} index={i} onOpen={onOpen} />
      ))}
    </section>
  )
}

/* Every other project ------------------------------------------------------ */

export function Index({ onOpen }: { onOpen: (p: Project) => void }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(otherProjects.map((p) => p.category)))], [])
  const [filter, setFilter] = useState('All')
  const shown = otherProjects.filter((p) => filter === 'All' || p.category === filter)
  return (
    <section id="index" className="index">
      <div className="section-head">
        <p className="eyebrow">More projects</p>
        <h2>
          <Rise inView>Everything else.</Rise>
        </h2>
      </div>
      <div className="filters" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>
      <ol className="index-list">
        <AnimatePresence initial={false}>
          {shown.map((p) => (
            <motion.li key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <button type="button" onClick={() => onOpen(p)}>
                <img src={p.logoPath} alt="" width={36} height={36} loading="lazy" />
                <span className="index-name">{p.title}</span>
                <span className="index-desc">{p.summary}</span>
                <span className="index-cat">{p.category}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  )
}

/* Skills and activity ------------------------------------------------------ */

export function Stack() {
  return (
    <section className="stack">
      <div className="section-head">
        <p className="eyebrow">Stack</p>
        <h2>
          <Rise inView>What I build with.</Rise>
        </h2>
      </div>
      <div className="stack-grid">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.06} className="stack-cell">
            <h3>{s.group}</h3>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <div className="activity">
        <Activity />
      </div>
    </section>
  )
}

/* Contact ---------------------------------------------------------------- */

export function Contact() {
  return (
    <footer id="contact" className="contact">
      <p className="eyebrow">Contact</p>
      <h2>
        <Rise inView>Have something to build?</Rise>
        <Rise inView delay={0.08}>
          Let&rsquo;s talk.
        </Rise>
      </h2>
      <a className="contact-mail" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="contact-companies">
        {ventures.map((v) => (
          <p key={v.name}>
            <span>{v.name}</span>
            <a href={`mailto:${v.email}`}>{v.email}</a>
          </p>
        ))}
      </div>
      <div className="contact-links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {ventures.map((v) => (
          <a key={v.name} href={v.href} target="_blank" rel="noreferrer">
            {v.name}
          </a>
        ))}
      </div>
      <div className="contact-base">
        <span>
          {profile.name}, {profile.location}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

/* Project panel ------------------------------------------------------------ */

export function ProjectPanel({ project, onClose, onOpen }: { project: Project; onClose: () => void; onOpen: (p: Project) => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    stopScroll(true)
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      stopScroll(false)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 })
  }, [project.id])

  return (
    <motion.div className="panel-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        ref={panel}
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        data-lenis-prevent
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-bar">
          <button type="button" className="link" onClick={onClose}>
            Close
          </button>
          <span>
            {pad(index + 1)} / {pad(projects.length)}
          </span>
        </div>
        <div className="panel-head">
          <img src={project.logoPath} alt="" width={56} height={56} />
          <div>
            <p className="work-kind">{project.kind ?? project.category}</p>
            <h2>{project.title}</h2>
          </div>
        </div>
        {project.image && <Browser project={project} />}
        <div className="panel-body">
          <div>
            <h3>Overview</h3>
            <p>{project.fullDescription}</p>
            {project.problemSolved && !project.image && (
              <>
                <h3>The problem</h3>
                <p>{project.problemSolved}</p>
              </>
            )}
          </div>
          <dl className="panel-facts">
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            {project.techStack.length > 0 && (
              <div>
                <dt>Built with</dt>
                <dd>{project.techStack.join(', ')}</dd>
              </div>
            )}
            <div>
              <dt>Links</dt>
              <dd className="panel-links">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    {project.domain ?? 'Live site'}
                  </a>
                ) : (
                  <span>Live site not public</span>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    Source on GitHub
                  </a>
                )}
                {project.playStoreUrl && (
                  <a href={project.playStoreUrl} target="_blank" rel="noreferrer">
                    Google Play
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <button type="button" className="panel-next" onClick={() => onOpen(next)}>
          <span>Next project</span>
          <strong>{next.title}</strong>
        </button>
      </motion.div>
    </motion.div>
  )
}

/* Search (Ctrl K) ---------------------------------------------------------- */

export function Search({ open, setOpen, onOpen }: { open: boolean; setOpen: (v: boolean) => void; onOpen: (p: Project) => void }) {
  const [query, setQuery] = useState('')
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])
  const q = query.trim().toLowerCase()
  const results = projects.filter(
    (p) => !q || [p.title, p.category, p.summary, ...p.techStack].some((t) => t.toLowerCase().includes(q)),
  )
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="search-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="search"
            role="dialog"
            aria-modal="true"
            aria-label="Search projects"
            data-lenis-prevent
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, technology or category" aria-label="Search" />
            <ul>
              {results.slice(0, 12).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      onOpen(p)
                    }}
                  >
                    <img src={p.logoPath} alt="" width={28} height={28} />
                    <span>{p.title}</span>
                    <em>{p.category}</em>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className="search-empty">No projects match that.</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
