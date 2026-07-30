import React, { useRef } from 'react'
import { motion } from 'framer-motion'

interface ReflectiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function ReflectiveCard({ children, className = '', style = {}, ...props }: ReflectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`reflective-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
        ...style
      }}
      whileHover={{
        borderColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.05)',
        y: -3
      }}
      {...props}
    >
      {/* Resend Mouse-Spotlight Radial Reflection Layer */}
      <div
        className="reflective-spotlight"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.07), transparent 40%)',
          zIndex: 1
        }}
      />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  )
}
