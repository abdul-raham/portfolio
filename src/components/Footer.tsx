import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '3.5rem 0 2.5rem 0',
      marginTop: '4rem',
      background: 'rgba(0, 0, 0, 0.4)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.75rem',
        textAlign: 'center'
      }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Abdulrahman Bakare
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Co-Founder & Lead Engineer @ DocTech Global • Founder & CEO @ MedAxis & TechCircle
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
          <a href="https://github.com/abdul-raham" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Linkedin size={20} />
          </a>
          <a href="mailto:Doctechglobalz@gmail.com" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Mail size={20} />
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-tertiary)', fontSize: '0.825rem' }}>
          <span>© {new Date().getFullYear()} Abdulrahman Bakare. All rights reserved.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  )
}
