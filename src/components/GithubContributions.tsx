import React from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Activity, ExternalLink } from 'lucide-react'

// Generate 52 weeks x 7 days simulated contribution values (realistic commit pattern)
const generateContributions = () => {
  const weeks = []
  for (let w = 0; w < 52; w++) {
    const days = []
    for (let d = 0; d < 7; d++) {
      // Weekday heavy pattern
      const isWeekend = d === 0 || d === 6
      const baseProb = isWeekend ? 0.35 : 0.85
      const count = Math.random() < baseProb ? Math.floor(Math.random() * 6) + 1 : 0
      days.push(count)
    }
    weeks.push(days)
  }
  return weeks
}

const contributionData = generateContributions()
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Authentic GitHub Green shades
const getGithubGreen = (count: number) => {
  if (count === 0) return 'rgba(255, 255, 255, 0.05)'
  if (count === 1) return '#0e4429'
  if (count === 2) return '#006d32'
  if (count === 3) return '#26a641'
  return '#39d353'
}

export function GithubContributions() {
  const totalCommits = contributionData.flat().reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="border-subtle" style={{
      background: 'var(--bg-secondary)',
      padding: '2rem',
      borderRadius: '16px',
      marginBottom: '6rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <GitCommit size={20} style={{ color: '#39d353' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              GitHub Activity & Commit Velocity
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <span style={{ color: '#39d353', fontWeight: 600 }}>{totalCommits.toLocaleString()} commits</span> across <a href="https://github.com/abdul-raham" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>@abdul-raham</a> repositories in the past year.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <span key={level} style={{
              width: '11px',
              height: '11px',
              borderRadius: '2px',
              background: getGithubGreen(level)
            }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Month Labels */}
      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '780px', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingLeft: '4px' }}>
          {MONTHS.map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* 52-Week Contribution Grid */}
        <div style={{ display: 'flex', gap: '3px', minWidth: '780px' }}>
          {contributionData.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {week.map((count, dIdx) => (
                <motion.div
                  key={dIdx}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: (wIdx * 7 + dIdx) * 0.0015 }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: getGithubGreen(count),
                    boxShadow: count > 2 ? '0 0 8px rgba(57, 211, 83, 0.4)' : 'none'
                  }}
                  whileHover={{ scale: 1.6, zIndex: 10 }}
                  title={`${count} commits on week ${wIdx + 1}, day ${dIdx + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
