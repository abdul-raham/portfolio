import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import './experienceTimeline.css'

const chapters = [
  { year: '2022', label: 'The foundation', title: 'Building for the real world', description: 'Early client systems and mobile work taught me to turn operational problems into software people can actually use.', detail: 'Client platforms · Mobile systems', accent: '#8b9bff', mark: '01', preview: 'Systems before spectacle' },
  { year: '2023', label: 'A new direction', title: 'TechCircle takes shape', description: 'I started building a technology commerce network around storefronts, inventory, and stronger connections between vendors and customers.', detail: 'Commerce · Founder', accent: '#ffad78', mark: 'TC', preview: 'Commerce, connected' },
  { year: '2023', label: 'Engineering in depth', title: 'Electronics meets software', description: 'At Lagos State University, I began pairing electronics and computer engineering with the software systems I was already shipping.', detail: 'LASU · Electronics & Computer Engineering', accent: '#74c8ed', mark: 'E/C', preview: 'Hardware thinking. Software craft.' },
  { year: '2024', label: 'Company building', title: 'DocTech Global', description: 'As co-founder and lead engineer, I began shaping product architecture and technical delivery for complex business workflows.', detail: 'Co-founder · Lead engineer', accent: '#66e5ab', mark: 'DT', preview: 'Ideas into infrastructure', href: 'https://doctechglobal.com.ng/' },
  { year: '2024', label: 'Healthcare systems', title: 'MedAxis', description: 'I founded MedAxis to bring patient encounters, billing, HMO claims, and hospital operations into one coherent workflow.', detail: 'Founder · HealthTech', accent: '#8dcbff', mark: 'M+', preview: 'Care runs better together', href: 'https://medaxis-nine.vercel.app' },
  { year: '2026', label: 'Still in motion', title: 'The next systems', description: 'Today my work spans healthcare, commerce, AI, and enterprise tools. The through-line is making ambitious systems feel clear and useful.', detail: 'Product engineering · Lagos', accent: '#d2b6ff', mark: '∞', preview: 'Keep building what matters' },
]

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
            {Array.from({ length: 72 }, (_, index) => { const angle = index * 5; const start = polar(177, angle); const end = polar(index % 6 === 0 ? 160 : 168, angle); return <line key={index} className={index % 6 === 0 ? 'career-tick major' : 'career-tick'} x1={start.x} y1={start.y} x2={end.x} y2={end.y} /> })}
            {chapters.map((chapter, index) => { const angle = -90 + (index - active) * 39; const dot = polar(187, angle); const label = polar(224, angle); return <g key={index} className={`career-year ${index === active ? 'active' : ''}`} style={{ opacity: clamp(1 - Math.abs(index - active) * .18, .12, 1) }}><circle cx={dot.x} cy={dot.y} r={index === active ? 8 : 5} /><text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">{chapter.year}</text></g> })}
            <path className="career-pointer" d="M270 17 L290 17 L280 37 Z" /><text className="career-center-year" x="280" y="276" textAnchor="middle">{current.year}</text><text className="career-center-label" x="280" y="315" textAnchor="middle">{current.label}</text>
          </svg>
          <div className="career-controls"><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft size={18} /></button><span>{String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span><button type="button" onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Next chapter"><ArrowRight size={18} /></button></div>
        </div>
        <div className="career-preview-side" style={{ '--chapter-accent': current.accent } as React.CSSProperties}>
          <div className="career-preview-top"><span>SELECTED CHAPTER</span><span>ABDULRAHMAN BAKARE / ARCHIVE</span></div>
          <div className="career-art" key={active}><div className="career-art-orbit orbit-one" /><div className="career-art-orbit orbit-two" /><span className="career-art-mark">{current.mark}</span><span className="career-art-caption">{current.preview}</span></div>
          <article className="career-chapter" key={`chapter-${active}`} aria-live="polite"><span className="career-chapter-meta">{current.label} <span>·</span> {current.detail}</span><h3>{current.title}</h3><p>{current.description}</p>{current.href && <a href={current.href} target="_blank" rel="noopener noreferrer">Explore the work <ArrowUpRight size={16} /></a>}</article>
          <div className="career-progress" aria-hidden="true"><span style={{ width: `${(active + 1) / chapters.length * 100}%` }} /></div>
        </div>
      </div></div>
    </section>
  )
}
