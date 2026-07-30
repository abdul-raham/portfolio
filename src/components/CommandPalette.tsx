import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Folder, Command, ArrowRight, X, ExternalLink } from 'lucide-react'
import { PROJECTS, ProjectData } from '../data/projectsData'

interface CommandPaletteProps {
  onSelectProject: (project: ProjectData) => void
}

export function CommandPalette({ onSelectProject }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredProjects = PROJECTS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    (p.demoUrl && p.demoUrl.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <>
      {/* Search Command Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          background: 'rgba(255, 255, 255, 0.03)',
          color: 'var(--text-tertiary)',
          fontSize: '0.8rem',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--text-secondary)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)'
          e.currentTarget.style.color = 'var(--text-tertiary)'
        }}
      >
        <Command size={14} />
        <span>Search projects...</span>
        <kbd style={{
          padding: '2px 5px',
          borderRadius: '4px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.7rem'
        }}>⌘K</kbd>
      </button>

      {/* Full Backdrop Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '12vh',
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '620px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-hover)',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.05)',
                cursor: 'default'
              }}
            >
              {/* Input Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-color)',
                gap: '0.75rem',
                position: 'relative'
              }}>
                <Search size={18} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search 16+ live projects, domains, technologies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Results List */}
              <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
                {filteredProjects.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                    No matching projects found.
                  </div>
                ) : (
                  filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p)
                        setIsOpen(false)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, minWidth: 0 }}>
                        <Folder size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{p.title}</span>
                            {p.displayDomain && (
                              <span style={{ fontSize: '0.725rem', color: '#00ff88', fontWeight: 400 }}>
                                {p.displayDomain}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.shortDescription}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                          {p.category}
                        </span>
                        <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div style={{
                padding: '0.6rem 1.25rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'flex',
                justify: 'space-between',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <span>Press <strong>Esc</strong> or click outside to close</span>
                <span>{filteredProjects.length} projects</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
