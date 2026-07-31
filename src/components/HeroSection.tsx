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
      paddingTop: '80px',
      paddingBottom: '3rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(14px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ maxWidth: '880px', width: '100%' }}
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
            fontSize: 'clamp(0.75rem, 3.2vw, 0.825rem)',
            background: 'rgba(0, 255, 136, 0.04)',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.1)',
            textDecoration: 'none',
            maxWidth: '100%',
            lineHeight: 1.3
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 10px #00ff88',
            flexShrink: 0
          }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            Co-Founder & Lead Engineer at DocTech Global 
            <ExternalLink size={12} style={{ color: '#00ff88', flexShrink: 0 }} />
          </span>
        </motion.a>

        {/* H1 Responsive Title */}
        <h1 style={{
          fontSize: 'clamp(2.1rem, 6.8vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          marginBottom: '1.25rem',
          wordBreak: 'break-word'
        }}>
          Abdulrahman Bakare.<br />
          <span className="subtle-gradient-text">Building High-Fidelity Software Systems.</span>
        </h1>
        
        {/* Subtitle Paragraph */}
        <p style={{
          fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '740px',
          marginBottom: '1.75rem'
        }}>
          Co-Founder & Lead Engineer at <strong><a href="https://doctechglobal.com.ng/" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', textDecoration: 'none' }}>DocTech Global</a></strong> | Founder & CEO of <strong>TechCircle</strong> & <strong>MedAxis</strong>. Electronics & Computer Engineering student at <strong>Lagos State University (LASU)</strong>. Engineer by training, product designer by instinct, and builder at heart.
        </p>

        {/* Key Ventures Tags Grid */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.25rem',
          maxWidth: '100%'
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
              fontSize: 'clamp(0.775rem, 2.8vw, 0.85rem)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              maxWidth: '100%'
            }}
          >
            <Building2 size={14} style={{ color: '#00ff88', flexShrink: 0 }} />
            <span>Co-Founder & Lead Engineer @ DocTech Global</span>
            <ExternalLink size={12} style={{ flexShrink: 0 }} />
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
              fontSize: 'clamp(0.775rem, 2.8vw, 0.85rem)',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              maxWidth: '100%'
            }}
          >
            <Activity size={14} style={{ color: '#00ff88', flexShrink: 0 }} />
            <span>Founder & CEO @ MedAxis</span>
            <ExternalLink size={12} style={{ flexShrink: 0 }} />
          </a>

          <span style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.775rem, 2.8vw, 0.85rem)',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            maxWidth: '100%'
          }}>
            <ShoppingBag size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
            <span>Founder & CEO @ TechCircle</span>
          </span>

          <span style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-tertiary)',
            fontSize: 'clamp(0.75rem, 2.6vw, 0.85rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <MapPin size={12} style={{ flexShrink: 0 }} /> Lagos, Nigeria
          </span>
        </div>

        {/* Action Buttons & Social Links Container */}
        <div className="hero-cta-wrapper">
          <motion.a 
            href="#projects" 
            className="btn btn-primary hero-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Projects <ArrowRight size={16} />
          </motion.a>
          
          <motion.button 
            onClick={onOpenContact} 
            className="btn btn-secondary hero-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} /> Contact Inquiries
          </motion.button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a 
              href="https://github.com/abdul-raham" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              style={{ color: 'var(--text-secondary)', padding: '10px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              style={{ color: 'var(--text-secondary)', padding: '10px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
