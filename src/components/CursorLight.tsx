import React, { useEffect, useState } from 'react'

export function CursorLight() {
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (opacity === 0) setOpacity(1)
    }
    const handleMouseLeave = () => setOpacity(0)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [opacity])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99,
        transition: 'opacity 0.5s ease',
        opacity: opacity,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(0, 255, 136, 0.04), transparent 40%)`
      }}
    />
  )
}
