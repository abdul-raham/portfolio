import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Lock, Cpu, CheckCircle2, Layers, Globe, Play } from 'lucide-react'
import { ProjectData } from '../data/projectsData'
import { GithubLanguageBar } from './GithubLanguageBar'

interface ProjectDetailModalProps {
  project: ProjectData | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="border-subtle"
          style={{
            width: '100%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-secondary)',
            padding: ' clamp(1.25rem, 4vw, 2.5rem)',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            cursor: 'default'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>

          {/* Header & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-primary)'
            }}>
              {project.category}
            </span>

            {project.displayDomain && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  color: '#00ff88',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 255, 136, 0.3)'
                }}
              >
                <Globe size={12} /> {project.displayDomain} <ExternalLink size={10} />
              </a>
            )}

            {project.isPlayStore && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(97, 218, 251, 0.12)',
                  color: '#61dafb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'none',
                  border: '1px solid rgba(97, 218, 251, 0.3)'
                }}
              >
                <Play size={10} style={{ fill: '#61dafb' }} /> Google Play App
              </a>
            )}

            {project.isPrivate ? (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: '100px',
                background: 'rgba(255, 170, 0, 0.1)',
                color: '#ffaa00',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Lock size={12} /> Private Client IP
              </span>
            ) : (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Github size={12} /> Open Source
              </span>
            )}
          </div>

          {/* Title Header with Actual Logo Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)'
            }}>
              <img 
                src={project.logoPath} 
                alt={`${project.title} logo`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              {project.title}
            </h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {project.fullDescription}
          </p>

          {/* Animated GitHub Language Bar */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span>Repository Language Distribution</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{project.repoPath || project.displayDomain}</span>
            </div>
            <GithubLanguageBar languages={project.languages} showLegend={true} height={8} />
          </div>

          {/* Problem & Solution */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} style={{ color: 'var(--text-secondary)' }} /> Core Problem & Value Delivered
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              {project.problemSolved}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} style={{ color: 'var(--text-secondary)' }} /> Key Architectural Specs
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.architectureHighlights.map((highlight, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: '#00ff88', marginTop: '3px', flexShrink: 0 }} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {project.techStack.map(tech => (
                <span key={tech} style={{
                  fontSize: '0.725rem',
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

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ gap: '0.5rem' }}
                >
                  <Github size={16} /> Repository
                </a>
              )}
              {project.isPlayStore && (
                <a 
                  href={project.playStoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ gap: '0.5rem', borderColor: 'rgba(97, 218, 251, 0.4)', color: '#61dafb' }}
                >
                  <Play size={14} style={{ fill: '#61dafb' }} /> Google Play
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ gap: '0.5rem', background: '#00ff88', color: '#000000', borderColor: '#00ff88', fontWeight: 600 }}
                >
                  <ExternalLink size={16} /> Visit Live Production App
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
