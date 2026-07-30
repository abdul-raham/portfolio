import { motion, AnimatePresence } from 'framer-motion'
import { X, Building2, Activity, ShoppingBag, Award, Terminal } from 'lucide-react'

interface AboutDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutDrawer({ isOpen, onClose }: AboutDrawerProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
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
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="border-subtle"
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-secondary)',
            padding: '2.5rem',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            cursor: 'default'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
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
              transition: 'all 0.2s'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00ff88', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Award size={16} /> Engineering & Founder Bio
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            About Abdulrahman Bakare
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            I am a software engineer, system architect, and founder based in Lagos, Nigeria. Studying <strong>Electronics & Computer Engineering at Lagos State University (LASU)</strong>, I bridge hardware fundamentals with software platforms.
          </p>

          {/* Three Ventures Pillar Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(0, 255, 136, 0.04)', border: '1px solid rgba(0, 255, 136, 0.2)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#00ff88', marginBottom: '0.25rem' }}>
                <Building2 size={16} /> DocTech Global — Co-Founder & Lead Engineer
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Architecting high-scale software platforms, document automation engines, and cloud solutions. Official site: <a href="https://doctechglobal.com.ng/" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88' }}>doctechglobal.com.ng</a>
              </p>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                <Activity size={16} style={{ color: '#00ff88' }} /> MedAxis — Founder & CEO
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Healthcare operations platform built to eliminate hospital billing friction, automate HMO claim audits, and streamline clinical encounters.
              </p>
            </div>

            <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                <ShoppingBag size={16} style={{ color: '#61dafb' }} /> TechCircle — Founder & CEO
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Technology commerce network linking equipment vendors with buyers through real-time stock sync and verified digital storefronts.
              </p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={16} style={{ color: '#00ff88' }} /> Engineering Philosophy
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              1. <strong>Zero-Bloat Systems</strong>: Every dependency and line of code must justify its existence.<br />
              2. <strong>Sub-Second Latency</strong>: Design for speed and immediate visual feedback.<br />
              3. <strong>Resend Aesthetics</strong>: High-fidelity dark mode interfaces that feel state-of-the-art.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
