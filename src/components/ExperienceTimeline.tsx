import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import './experienceTimeline.css'

const chapters = [
  { year: '2022', label: 'Mobile systems', title: 'Rahlah & OptiConnect', role: 'Systems & Mobile Application Developer', location: 'Remote', description: 'Built cross-platform logistics trackers and real-time webhook transformation tools for mobile products.', detail: '2022 — 2023', tech: ['React Native', 'TypeScript', 'Expo', 'SQLite'], accent: '#8b9bff', mark: '01', preview: 'Software in motion' },
  { year: '2023', label: 'Founder story', title: 'TechCircle', role: 'Founder & CEO', location: 'Lagos, Nigeria', description: 'Building a technology commerce network connecting vendors and customers through storefronts, inventory visibility, and trusted communication.', detail: '2023 — Present', tech: ['CommerceTech', 'React', 'TypeScript', 'Node.js'], accent: '#ffad78', mark: 'TC', preview: 'Commerce, connected' },
  { year: '2023', label: 'Education', title: 'Lagos State University', role: 'Electronics & Computer Engineering Student', location: 'Ojo, Lagos', description: 'Combining electronic engineering fundamentals with algorithms, software architecture, and computer systems.', detail: '2023 — Present', tech: ['Computer Engineering', 'C/C++', 'Digital Logic'], accent: '#74c8ed', mark: 'E/C', preview: 'Hardware thinking. Software craft.' },
  { year: '2024', label: 'Company building', title: 'DocTech Global', role: 'Co-Founder & Lead Engineer', location: 'Lagos, Nigeria · Remote / Hybrid', description: 'Leading technical execution and system architecture for business platforms, document automation, and complex operational workflows.', detail: '2024 — Present', tech: ['System Architecture', 'React', 'Node.js', 'PostgreSQL'], accent: '#66e5ab', mark: 'DT', preview: 'Ideas into infrastructure', href: 'https://doctechglobal.com.ng/' },
  { year: '2024', label: 'Healthcare systems', title: 'MedAxis', role: 'Founder & CEO', location: 'Lagos, Nigeria', description: 'Modernizing hospital operations through patient encounters, HMO claims tracking, digital billing, and revenue protection.', detail: '2024 — Present', tech: ['HealthTech', 'React', 'TypeScript', 'Medical Billing'], accent: '#8dcbff', mark: 'M+', preview: 'Care runs better together', href: 'https://medaxis-nine.vercel.app' },
  { year: '2026', label: 'Enterprise systems', title: 'Client solutions', role: 'Enterprise Systems Architect & Full-Stack Lead', location: 'Remote', description: 'Designing and delivering enterprise portals, AI document extraction, and operational tools for clients across West Africa.', detail: '2022 — Present', tech: ['Next.js', 'Python', 'FastAPI', 'Docker'], accent: '#d2b6ff', mark: '∞', preview: 'Keep building what matters' },
]
const chapterVisuals = ['', '/techcircle-timeline.png', '', '/logos/doctech.svg', '/logos/medaxis.svg', '']

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const polar = (radius: number, degrees: number) => ({ x: 280 + Math.cos(degrees * Math.PI / 180) * radius, y: 280 + Math.sin(degrees * Math.PI / 180) * radius })

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const last = chapters.length - 1
  const syncScroll = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const travel = Math.max(section.offsetHeight - window.innerHeight, 1)
    setActive(Math.round(clamp(-section.getBoundingClientRect().top / travel, 0, 1) * last))
  }, [last])
  useEffect(() => {
    let frame = 0
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(syncScroll) }
    syncScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [syncScroll])
  const goTo = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const target = clamp(index, 0, last)
    const top = window.scrollY + section.getBoundingClientRect().top
    const travel = section.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + target / last * travel, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    setActive(target)
  }
  const current = chapters[active]
  return (
    <section id="experience" className="career-story" aria-label="Career journey">
      <div className="career-intro container"><span className="career-kicker">A journey in systems</span><h2>Every chapter changed<br /><em>what I could build.</em></h2><p>Turn the dial or scroll through the moments behind the work.</p></div>
      <div ref={sectionRef} className="career-scroll-space"><div className="career-stage">
        <div className="career-dial-side">
          <span className="career-side-label">The journey / 2022 — now</span>
          <svg className="career-dial" viewBox="0 0 560 560" role="img" aria-label={`Career dial at ${current.year}: ${current.title}`}>
            <circle className="career-dial-plate" cx="280" cy="280" r="252" /><circle className="career-dial-ring" cx="280" cy="280" r="186" />
            <g className="career-rotating-scale" style={{ transform: `rotate(${-active * 39}deg)` }}>
              {Array.from({ length: 72 }, (_, index) => { const angle = index * 5; const start = polar(177, angle); const end = polar(index % 6 === 0 ? 156 : 168, angle); return <line key={index} className={index % 6 === 0 ? 'career-tick major' : 'career-tick'} x1={start.x} y1={start.y} x2={end.x} y2={end.y} /> })}
              <path className="career-scale-marker" d="M280 94 L280 107" />
            </g>
            {chapters.map((chapter, index) => { const angle = -90 + (index - active) * 39; const dot = polar(187, angle); const label = polar(224, angle); return <g key={index} className={`career-year ${index === active ? 'active' : ''}`} style={{ opacity: clamp(1 - Math.abs(index - active) * .18, .12, 1) }} role="button" tabIndex={0} aria-label={`Go to ${chapter.year}: ${chapter.title}`} aria-current={index === active ? 'step' : undefined} onClick={() => goTo(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goTo(index) } }}><circle cx={dot.x} cy={dot.y} r={index === active ? 8 : 5} /><text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">{chapter.year}</text></g> })}
            <path className="career-pointer" d="M270 17 L290 17 L280 37 Z" /><text className="career-center-year" x="280" y="276" textAnchor="middle">{current.year}</text><text className="career-center-label" x="280" y="315" textAnchor="middle">{current.label}</text>
          </svg>
          <div className="career-controls"><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft size={18} /></button><span>{String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span><button type="button" onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Next chapter"><ArrowRight size={18} /></button></div>
        </div>
        <div className="career-preview-side" style={{ '--chapter-accent': current.accent } as React.CSSProperties}>
          <div className="career-preview-top"><span>SELECTED CHAPTER</span><span>ABDULRAHMAN BAKARE / ARCHIVE</span></div>
          <div className="career-art" key={active}>
            <div className="career-showcase">
              <div className="career-showcase-bar"><span><i /><i /><i /></span><span>{current.year} / {current.label}</span></div>
              <div className="career-showcase-body">
                {chapterVisuals[active] && <img className={`career-showcase-visual ${active === 1 ? 'photo' : ''}`} src={chapterVisuals[active]} alt="" />}
                <span className="career-showcase-index">CHAPTER {String(active + 1).padStart(2, '0')}</span>
                <div className="career-showcase-main">
                  <span className="career-showcase-mark">{current.mark}</span>
                  <div><span className="career-showcase-rule" /><strong>{current.preview}</strong><small>{current.detail}</small></div>
                </div>
                <div className="career-showcase-bottom"><span>ABDULRAHMAN / SELECTED WORK</span><span>↗</span></div>
              </div>
            </div>
            <span className="career-art-caption">A closer look at the work behind the year</span>
          </div>
          <article className="career-chapter" key={`chapter-${active}`} aria-live="polite"><span className="career-chapter-meta">{current.label} <span>·</span> {current.detail}</span><h3>{current.title}</h3><strong className="career-role">{current.role}</strong><span className="career-location">{current.location}</span><p>{current.description}</p><div className="career-tech">{current.tech.map(technology => <span key={technology}>{technology}</span>)}</div>{current.href && <a href={current.href} target="_blank" rel="noopener noreferrer">Explore the work <ArrowUpRight size={16} /></a>}</article>
          <div className="career-progress" aria-hidden="true"><span style={{ width: `${(active + 1) / chapters.length * 100}%` }} /></div>
        </div>
      </div></div>
    </section>
  )
}
