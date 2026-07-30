import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Layout, Server, Database, ShieldCheck } from 'lucide-react'
import { ReflectiveCard } from './ReflectiveCard'

const SKILL_DOMAINS = [
  {
    title: 'Frontend & System UI',
    icon: Layout,
    color: '#61dafb',
    skills: [
      { name: 'TypeScript', level: 96, desc: 'Strict typing, generic interfaces & architecture' },
      { name: 'React / Next.js', level: 94, desc: 'App router, SSR, custom state machines' },
      { name: 'Tailwind & Micro-animations', level: 92, desc: 'Framer Motion, Resend glass optics' }
    ]
  },
  {
    title: 'Backend & Core Systems',
    icon: Server,
    color: '#00ff88',
    skills: [
      { name: 'Node.js & Express', level: 92, desc: 'REST APIs, WebSockets, background workers' },
      { name: 'Python & FastAPI', level: 88, desc: 'LLM function calling & OCR parsers' },
      { name: 'C++ & Go', level: 84, desc: 'Native SQLite spatial indexing & Docker daemons' }
    ]
  },
  {
    title: 'Databases & Infrastructure',
    icon: Database,
    color: '#818cf8',
    skills: [
      { name: 'PostgreSQL & Redis', level: 90, desc: 'Relational schemas & cache backpressure' },
      { name: 'Docker & Linux DevOps', level: 86, desc: 'Zero-downtime rolling container deploys' },
      { name: 'WordPress & WooCommerce', level: 88, desc: 'Custom PHP theme engine & payment gates' }
    ]
  }
]

export function TechMatrix() {
  return (
    <div style={{ marginBottom: '6rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Core Technical Competencies</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Deep technical problem solving across system engineering, high-fidelity UI design, and cloud infrastructure.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.75rem'
      }}>
        {SKILL_DOMAINS.map((domain, idx) => {
          const IconComp = domain.icon
          return (
            <ReflectiveCard key={domain.title} style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${domain.color}15`,
                  border: `1px solid ${domain.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: domain.color
                }}>
                  <IconComp size={18} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {domain.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {domain.skills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span style={{ color: domain.color, fontWeight: 600 }}>{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                      height: '5px',
                      borderRadius: '100px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      overflow: 'hidden',
                      marginBottom: '4px'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        style={{ height: '100%', background: domain.color, borderRadius: '100px' }}
                      />
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {skill.desc}
                    </div>
                  </div>
                ))}
              </div>
            </ReflectiveCard>
          )
        })}
      </div>
    </div>
  )
}
