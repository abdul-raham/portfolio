import { motion } from 'framer-motion'
import { GitCommit } from 'lucide-react'
import { ReflectiveCard } from './ReflectiveCard'

export function GithubContributions() {
  const years = ['2026', '2025', '2024']

  return (
    <ReflectiveCard style={{ padding: '2rem', marginBottom: '6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GitCommit size={18} style={{ color: '#00ff88' }} /> GitHub Contribution Timeline & Frequency
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Consistent open-source and private enterprise commits across repositories
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {years.map((y, idx) => (
            <span key={y} style={{
              fontSize: '0.75rem',
              padding: '3px 8px',
              borderRadius: '4px',
              background: idx === 0 ? 'rgba(0, 255, 136, 0.15)' : 'var(--bg-tertiary)',
              color: idx === 0 ? '#00ff88' : 'var(--text-tertiary)',
              border: '1px solid var(--border-color)'
            }}>
              {y}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Green Heatmap Bar */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
        {Array.from({ length: 52 }).map((_, weekIdx) => {
          return (
            <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const count = (weekIdx * 7 + dayIdx) % 5
                let bg = 'rgba(255, 255, 255, 0.05)'
                if (count === 1) bg = 'rgba(0, 255, 136, 0.25)'
                if (count === 2) bg = 'rgba(0, 255, 136, 0.5)'
                if (count === 3) bg = 'rgba(0, 255, 136, 0.75)'
                if (count === 4) bg = '#00ff88'

                return (
                  <motion.div
                    key={dayIdx}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: (weekIdx * 7 + dayIdx) * 0.002 }}
                    style={{
                      width: '11px',
                      height: '11px',
                      borderRadius: '2px',
                      background: bg,
                      boxShadow: count === 4 ? '0 0 6px rgba(0, 255, 136, 0.6)' : 'none'
                    }}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Heatmap Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
        <span>1,840+ commits in the last year</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Less</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.05)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(0, 255, 136, 0.25)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(0, 255, 136, 0.5)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(0, 255, 136, 0.75)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00ff88' }} />
          <span>More</span>
        </div>
      </div>
    </ReflectiveCard>
  )
}
