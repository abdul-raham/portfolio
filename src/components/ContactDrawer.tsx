import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Copy, Check, X, Send, ShieldCheck } from 'lucide-react'

interface ContactDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [copied, setCopied] = useState(false)
  const email = 'Doctechglobalz@gmail.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            maxWidth: '540px',
            background: 'var(--bg-secondary)',
            padding: '2.25rem',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            cursor: 'default'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Contact Modal"
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
            <ShieldCheck size={16} /> Direct Contact & Inquiries
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Get in Touch
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Whether you are looking to build a high-fidelity B2B system, modern healthtech infrastructure, or discuss co-founding opportunities, reach out directly.
          </p>

          {/* Email Copy Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} style={{ color: '#00ff88' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Official Email</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{email}</div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', gap: '4px', fontSize: '0.8rem' }}
            >
              {copied ? <Check size={14} style={{ color: '#00ff88' }} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem', gap: '0.5rem', fontWeight: 600 }}
            >
              <Send size={16} /> Open Mail Client
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
