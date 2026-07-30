import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Menu, X, Layers, Briefcase, Mail, User } from 'lucide-react'
import { CommandPalette } from './CommandPalette'
import { ProjectData } from '../data/projectsData'

interface NavbarProps {
  onSelectProject: (project: ProjectData) => void
  onOpenContact: () => void
  onOpenAbout: () => void
}

export function Navbar({ onSelectProject, onOpenContact, onOpenAbout }: NavbarProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <header className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: '64px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontWeight: 800, letterSpacing: '-0.03em', fontSize: '1.2rem', color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          Abdurrahman<span style={{ color: '#00ff88' }}>.Dev</span>
        </motion.a>

        {/* Desktop Navigation Links */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <CommandPalette onSelectProject={onSelectProject} />

          <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button
              onClick={onOpenAbout}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              About
            </button>
            <a 
              href="#projects" 
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
            >
              Timeline
            </a>
            <button
              onClick={onOpenContact}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Contact
            </button>
            <a 
              href="https://github.com/abdul-raham" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
            >
              <Linkedin size={18} />
            </a>
          </nav>
        </div>

        {/* Mobile Command Palette & Hamburger Button */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CommandPalette onSelectProject={onSelectProject} />
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open Navigation Sidebar"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              cursor: 'pointer'
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Sliding Sidebar Drawer & Backdrop */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1000
              }}
            />

            {/* Sliding Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '280px',
                maxWidth: '85vw',
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)',
                zIndex: 1001,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
              }}
            >
              {/* Sidebar Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  Abdurrahman<span style={{ color: '#00ff88' }}>.Dev</span>
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close Sidebar"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sidebar Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false)
                    onOpenAbout()
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 0
                  }}
                >
                  <User size={18} style={{ color: '#00ff88' }} /> About & Bio
                </button>

                <a 
                  href="#projects" 
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Layers size={18} style={{ color: '#38bdf8' }} /> Projects
                </a>

                <a 
                  href="#experience" 
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Briefcase size={18} style={{ color: '#61dafb' }} /> Career Timeline
                </a>

                <button
                  onClick={() => {
                    setMobileSidebarOpen(false)
                    onOpenContact()
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 0
                  }}
                >
                  <Mail size={18} style={{ color: '#f472b6' }} /> Direct Contact
                </button>
              </div>

              {/* Footer Socials */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)' }}>
                <a href="https://github.com/abdul-raham" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
