import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGS = [
  '[01/04] LOADING CORE ENGINE...',
  '[02/04] VERIFYING 12+ REPOSITORIES...',
  '[03/04] INITIALIZING RESEND OPTICS...',
  '[04/04] SYSTEM READY'
]

export function EntranceLoader() {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 4
        if (next >= 25 && next < 50) setLogIndex(1)
        if (next >= 50 && next < 75) setLogIndex(2)
        if (next >= 75 && next < 100) setLogIndex(3)
        
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 200)
          return 100
        }
        return next
      })
    }, 45)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(24px)' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Background Spotlight Glow */}
          <div style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.18), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

          {/* Rotating High-Tech HUD Rings */}
          <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              viewBox="0 0 100 100"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="#00ff88" strokeWidth="2" strokeDasharray="40 180" strokeLinecap="round" />
            </motion.svg>

            <motion.svg
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              viewBox="0 0 100 100"
              style={{ position: 'absolute', inset: '10px', width: 'calc(100% - 20px)', height: 'calc(100% - 20px)' }}
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#61dafb" strokeWidth="1.5" strokeDasharray="30 120" strokeLinecap="round" />
            </motion.svg>

            {/* Inner Brand Mark */}
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', textAlign: 'center' }}>
              A<span style={{ color: '#00ff88' }}>.Dev</span>
            </div>
          </div>

          {/* Progress Bar & Log Messages */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '90%', maxWidth: '300px' }}>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Abdurrahman<span style={{ color: '#00ff88' }}>.Dev</span>
            </div>

            {/* Green Loading Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '100px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 12px rgba(0, 255, 136, 0.25)',
              marginBottom: '1rem'
            }}>
              <motion.div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00ff88 0%, #38bdf8 100%)',
                  boxShadow: '0 0 15px #00ff88'
                }}
              />
            </div>

            {/* Terminal Status Cycle */}
            <div style={{
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'var(--text-tertiary)',
              textAlign: 'center',
              height: '20px'
            }}>
              {LOGS[logIndex]} <span style={{ color: '#00ff88' }}>({progress}%)</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
