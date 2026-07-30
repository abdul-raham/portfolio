import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ExternalLink, GraduationCap, Building2, Activity, ShoppingBag, Laptop, Smartphone } from 'lucide-react'
import { ReflectiveCard } from './ReflectiveCard'

const EXPERIENCES = [
  {
    id: 'doctech-global',
    role: 'Co-Founder & Lead Engineer',
    company: 'DocTech Global',
    location: 'Lagos, Nigeria (Remote / Hybrid)',
    date: '2024 — Present',
    description: 'Leading technical execution and system architecture. Transforming complex operational challenges into high-performance software systems with a focus on exceptional UX.',
    technologies: ['System Architecture', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'B2B Platforms'],
    badge: 'Co-Founder & Lead Engineer',
    icon: Building2,
    iconColor: '#00ff88'
  },
  {
    id: 'medaxis-founder',
    role: 'Founder & CEO',
    company: 'MedAxis',
    location: 'Lagos, Nigeria',
    date: '2024 — Present',
    link: 'https://medaxis-nine.vercel.app',
    description: 'Modernizing hospital operations in Nigeria through digital workflows, centralized patient encounters, HMO claims tracking, and revenue leak protection from day one.',
    technologies: ['React', 'TypeScript', 'HealthTech OS', 'Medical Billing', 'EHR Protocols'],
    badge: 'Founder & CEO',
    icon: Activity,
    iconColor: '#00ff88'
  },
  {
    id: 'techcircle-founder',
    role: 'Founder & CEO',
    company: 'TechCircle',
    location: 'Lagos, Nigeria',
    date: '2023 — Present',
    description: 'Building a technology commerce network connecting vendors and customers through digital storefronts, inventory visibility, and trusted communications.',
    technologies: ['CommerceTech', 'TypeScript', 'Node.js', 'React', 'Multi-tenant Storefronts'],
    badge: 'Founder & CEO',
    icon: ShoppingBag,
    iconColor: '#00ff88'
  },
  {
    id: 'lasu-degree',
    role: 'Electronics & Computer Engineering Student',
    company: 'Lagos State University (LASU)',
    location: 'Ojo, Lagos, Nigeria',
    date: '2023 — Present',
    description: 'Combining electronic engineering fundamentals (embedded hardware, microcontrollers, signal processing) with modern computer systems architecture.',
    technologies: ['Computer Engineering', 'Hardware Systems', 'C/C++', 'Algorithms', 'Digital Logic'],
    badge: 'Education',
    isEducation: true,
    icon: GraduationCap,
    iconColor: '#61dafb'
  },
  {
    id: 'b2b-architect',
    role: 'Enterprise Systems Architect & Full-Stack Lead',
    company: 'B2B & HealthTech Client Solutions',
    location: 'Remote',
    date: '2022 — 2024',
    description: 'Designed and deployed custom enterprise portals, AI document extraction pipelines, and spatial routing engines for client platforms across West Africa.',
    technologies: ['React', 'Next.js', 'Python', 'FastAPI', 'Docker', 'WebSockets'],
    badge: 'Engineering Lead',
    icon: Laptop,
    iconColor: '#818cf8'
  },
  {
    id: 'mobile-spatial-lead',
    role: 'Systems & Mobile Application Developer',
    company: 'Rahlah Logistics & OptiConnect',
    location: 'Remote',
    date: '2022 — 2023',
    description: 'Built cross-platform logistics trackers and real-time webhook payload transformation proxies published on Google Play Store.',
    technologies: ['React Native', 'TypeScript', 'C++', 'Expo', 'SQLite', 'Google Play API'],
    badge: 'Mobile Systems',
    icon: Smartphone,
    iconColor: '#f472b6'
  }
]

export function ExperienceTimeline() {
  return (
    <div style={{ position: 'relative', paddingLeft: '2.75rem' }}>
      {/* Scroll-Assembling Connector Line */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '14px',
          bottom: 0,
          left: '13px',
          width: '2px',
          background: 'linear-gradient(to bottom, #00ff88, #818cf8, rgba(255,255,255,0.05))',
          transformOrigin: 'top'
        }}
      />

      {EXPERIENCES.map((exp, idx) => {
        const IconComponent = exp.icon
        return (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            style={{ position: 'relative', marginBottom: '2.5rem' }}
          >
            {/* Assembling Node Circle with Custom Computer & Domain Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 + 0.2 }}
              style={{
                position: 'absolute',
                left: '-2.75rem',
                top: '1.15rem',
                transform: 'translateX(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--bg-primary)',
                border: `2px solid ${exp.iconColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 14px ${exp.iconColor}40`,
                zIndex: 3
              }}
            >
              <IconComponent size={14} style={{ color: exp.iconColor }} />
            </motion.div>

            <ReflectiveCard style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h3>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: `${exp.iconColor}15`,
                      color: exp.iconColor,
                      border: `1px solid ${exp.iconColor}30`
                    }}>
                      {exp.badge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      <Briefcase size={14} /> {exp.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {exp.location}
                    </span>
                    {exp.link && (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        medaxis-nine.vercel.app <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Calendar size={12} /> {exp.date}
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {exp.description}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {exp.technologies.map(tech => (
                  <span key={tech} style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </ReflectiveCard>
          </motion.div>
        )
      })}
    </div>
  )
}
