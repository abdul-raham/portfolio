import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Github, Linkedin, ExternalLink, MapPin, Building2, Activity, ShoppingBag } from 'lucide-react'

interface HeroSectionProps {
  onOpenContact: () => void
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="container" style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '90px',
      paddingBottom: '3rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(14px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ maxWidth: '880px' }}
      >
        {/* Status Pill with Glowing Green Pulse linking to DocTech Global */}
        <motion.a 
          href="https://doctechglobal.com.ng/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            borderRadius: '100px',
            fontSize: '0.825rem',
            background: 'rgba(0, 255, 136, 0.04)',
            color: 'var(--text-primary)',
            marginBottom: '1.75rem',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.1)',
            textDecoration: 'none'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 10px #00ff88'
          }} />
          <span>Co-Founder & Lead Engineer at DocTech Global <ExternalLink size={12} style={{ color: '#00ff88' }} /></span>
        </motion.a>

        {/* H1 Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.04em',
          marginBottom: '1.25rem'
        }}>
          Abdulrahman Bakare.<br />
          <span className="subtle-gradient-text">Building High-Fidelity Software Systems.</span>
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '740px',
          marginBottom: '2rem'
        }}>
          Co-Founder & Lead Engineer at <strong><a href="https://doctechglobal.com.ng/" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', textDecoration: 'none' }}>DocTech Global</a></strong> | Founder & CEO of <strong>TechCircle</strong> & <strong>MedAxis</strong>. Electronics & Computer Engineering student at <strong>Lagos State University (LASU)</strong>. Engineer by training, product designer by instinct, and builder at heart.
        </p>

        {/* Key Ventures Tags */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <a 
            href="https://doctechglobal.com.ng/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              color: '#00ff88',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <Building2 size={14} style={{ color: '#00ff88' }} /> Co-Founder & Lead Engineer @ DocTech Global <ExternalLink size={12} />
          </a>

          <a 
            href="https://medaxis-nine.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <Activity size={14} style={{ color: '#00ff88' }} /> Founder & CEO @ MedAxis <ExternalLink size={12} />
          </a>

          <span style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShoppingBag size={14} style={{ color: 'var(--text-secondary)' }} /> Founder & CEO @ TechCircle
          </span>

          <span style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <MapPin size={12} /> Lagos, Nigeria
          </span>
        </div>

        {/* Buttons & Socials */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.a 
            href="#projects" 
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
          >
            Explore Projects <ArrowRight size={16} />
          </motion.a>
          
          <motion.button 
            onClick={onOpenContact} 
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ gap: '0.5rem', padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
          >
            <Mail size={16} /> Contact Inquiries
          </motion.button>

          <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem' }}>
            <a 
              href="https://github.com/abdul-raham" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              style={{ color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex' }}
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              style={{ color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex' }}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
