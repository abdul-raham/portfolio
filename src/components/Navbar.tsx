import { useState } from 'react'
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

        {/* Mobile Command Palette Icon & Hamburger Button */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Sliding Glass Sidebar Drawer (Sliding from RIGHT) */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileSidebarOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            />

            {/* Sliding Glass Sidebar Drawer from RIGHT */}
            <motion.aside
              initial={{ x: '100%', opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '290px',
                maxWidth: '85vw',
                background: 'rgba(10, 10, 14, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-15px 0 40px rgba(0, 0, 0, 0.8)'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                height: '64px',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0 1.25rem'
              }}>
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#ffffff' }}>
                  Abdurrahman<span style={{ color: '#00ff88' }}>.Dev</span>
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close menu"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
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

              {/* Navigation Items List */}
              <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false)
                    onOpenAbout()
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '12px',
                    color: '#ffffff',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  <User size={18} style={{ color: '#00ff88' }} /> About & Bio
                </button>

                <a 
                  href="#projects" 
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '12px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  <Layers size={18} style={{ color: '#38bdf8' }} /> Projects
                </a>

                <a 
                  href="#experience" 
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '12px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
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
                    border: '1px solid transparent',
                    borderRadius: '12px',
                    color: '#ffffff',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  }}
                >
                  <Mail size={18} style={{ color: '#f472b6' }} /> Direct Contact
                </button>
              </nav>

              {/* Footer Actions */}
              <div style={{
                padding: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <a 
                  href="https://github.com/abdul-raham" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem', gap: '0.4rem', fontSize: '0.85rem' }}
                >
                  <Github size={16} /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem', gap: '0.4rem', fontSize: '0.85rem' }}
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
