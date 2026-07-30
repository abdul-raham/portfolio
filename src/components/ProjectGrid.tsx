import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Lock, ArrowUpRight, Globe, Play, Layers, Activity, Cpu, ShoppingBag, Smartphone, GraduationCap, Globe2, Wrench } from 'lucide-react'
import { PROJECTS, ProjectData } from '../data/projectsData'
import { ReflectiveCard } from './ReflectiveCard'
import { GithubLanguageBar } from './GithubLanguageBar'

interface ProjectGridProps {
  onSelectProject: (project: ProjectData) => void
}

const CATEGORIES = [
  { name: 'All', icon: Layers },
  { name: 'Healthcare', icon: Activity },
  { name: 'SaaS', icon: Cpu },
  { name: 'Commerce', icon: ShoppingBag },
  { name: 'AI & ML', icon: Cpu },
  { name: 'Mobile', icon: Smartphone },
  { name: 'Education', icon: GraduationCap },
  { name: 'WordPress / CMS', icon: Globe2 },
  { name: 'DevOps & Tooling', icon: Wrench }
]

export function ProjectGrid({ onSelectProject }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory)

  // Count items per category for badges
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') return PROJECTS.length
    return PROJECTS.filter(p => p.category === categoryName).length
  }

  return (
    <div>
      {/* High-Fidelity Category Filter Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        overflowX: 'auto',
        padding: '6px',
        marginBottom: '2.5rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {CATEGORIES.map(cat => {
          const IconComponent = cat.icon
          const isActive = activeCategory === cat.name
          const count = getCategoryCount(cat.name)

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '0.825rem',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: 'none',
                background: 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                zIndex: 1
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(0, 255, 136, 0.4)',
                    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.1)',
                    zIndex: -1
                  }}
                />
              )}

              <IconComponent size={14} style={{ color: isActive ? '#00ff88' : 'var(--text-tertiary)' }} />
              <span>{cat.name}</span>
              
              <span style={{
                fontSize: '0.7rem',
                padding: '1px 6px',
                borderRadius: '100px',
                background: isActive ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#00ff88' : 'var(--text-tertiary)',
                fontWeight: 600
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Project Grid */}
      <motion.div 
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ReflectiveCard
                onClick={() => onSelectProject(project)}
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Header: Actual Logo SVG Avatar + Title + Action Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Actual SVG Logo Avatar */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}>
                      <img 
                        src={project.logoPath} 
                        alt={`${project.title} logo`} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    <div>
                      <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {project.category}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {project.isPrivate ? (
                      <span title="Private Client IP" style={{ color: '#ffaa00' }}>
                        <Lock size={16} />
                      </span>
                    ) : (
                      <span title="Open Source" style={{ color: 'var(--text-tertiary)' }}>
                        <Github size={16} />
                      </span>
                    )}
                    <ArrowUpRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                </div>

                {/* Badges Row: Live Domain + Google Play Store Badge */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {project.displayDomain && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.725rem',
                        color: '#00ff88',
                        background: 'rgba(0, 255, 136, 0.08)',
                        padding: '3px 9px',
                        borderRadius: '100px',
                        border: '1px solid rgba(0, 255, 136, 0.2)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Globe size={11} /> {project.displayDomain} <ExternalLink size={10} />
                    </a>
                  )}

                  {project.isPlayStore && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.725rem',
                        color: '#61dafb',
                        background: 'rgba(97, 218, 251, 0.1)',
                        padding: '3px 9px',
                        borderRadius: '100px',
                        border: '1px solid rgba(97, 218, 251, 0.25)',
                        textDecoration: 'none',
                        fontWeight: 500
                      }}
                    >
                      <Play size={10} style={{ fill: '#61dafb' }} /> Google Play App
                    </a>
                  )}
                </div>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
                  flexGrow: 1
                }}>
                  {project.shortDescription}
                </p>

                {/* GitHub Language Bar Component */}
                <GithubLanguageBar languages={project.languages} showLegend={false} height={6} />

                {/* Tech Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-secondary)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', alignSelf: 'center' }}>
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </ReflectiveCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
