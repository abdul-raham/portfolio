import React from 'react'
import { motion } from 'framer-motion'
import { ProjectLanguage } from '../data/projectsData'

interface GithubLanguageBarProps {
  languages: ProjectLanguage[]
  showLegend?: boolean
  height?: number
}

export function GithubLanguageBar({ languages, showLegend = true, height = 8 }: GithubLanguageBarProps) {
  return (
    <div style={{ width: '100%' }}>
      {/* Animated Language Bar */}
      <div style={{
        width: '100%',
        height: `${height}px`,
        borderRadius: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        overflow: 'hidden',
        gap: '2px',
        margin: '8px 0 12px 0'
      }}>
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              backgroundColor: lang.color,
              borderRadius: i === 0 ? '100px 0 0 100px' : i === languages.length - 1 ? '0 100px 100px 0' : '0'
            }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>

      {/* Legend with percentage numbers & dots */}
      {showLegend && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.875rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}>
          {languages.map((lang) => (
            <div key={lang.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: lang.color,
                display: 'inline-block'
              }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lang.name}</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{lang.percentage}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
