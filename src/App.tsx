import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProjectGrid } from './components/ProjectGrid'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { GithubContributions } from './components/GithubContributions'
import { TechMatrix } from './components/TechMatrix'
import { ContactDrawer } from './components/ContactDrawer'
import { AboutDrawer } from './components/AboutDrawer'
import { ProjectDetailModal } from './components/ProjectDetailModal'
import { EntranceLoader } from './components/EntranceLoader'
import { CursorLight } from './components/CursorLight'
import { Footer } from './components/Footer'
import { PROJECTS, ProjectData } from './data/projectsData'

function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // Handle URL hash route /project/:id mapping
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/project/')) {
        const projectId = hash.replace('#/project/', '')
        const found = PROJECTS.find(p => p.id === projectId)
        if (found) setSelectedProject(found)
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project)
    window.history.pushState(null, '', `#/project/${project.id}`)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    window.history.pushState(null, '', window.location.pathname)
  }

  return (
    <div className="min-h-screen" style={{ position: 'relative' }}>
      {/* Global Mouse Spotlight Beam */}
      <CursorLight />

      {/* Full-Screen Animated Entrance Preloader */}
      <EntranceLoader />

      <Navbar 
        onSelectProject={handleSelectProject} 
        onOpenContact={() => setContactOpen(true)} 
        onOpenAbout={() => setAboutOpen(true)}
      />
      
      <main>
        <HeroSection onOpenContact={() => setContactOpen(true)} />
        
        <motion.section 
          id="projects" 
          className="container" 
          style={{ paddingBottom: '6rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Full Project Portfolio</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Select any project to inspect architectural details, core specs, and GitHub language distribution bars.
            </p>
          </div>
          <ProjectGrid onSelectProject={handleSelectProject} />
        </motion.section>

        <motion.section 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <TechMatrix />
        </motion.section>

        <motion.section 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GithubContributions />
        </motion.section>

        <motion.section 
          id="experience" 
          className="container" 
          style={{ paddingBottom: '6rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Experience & Career Timeline</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Scroll-assembling milestones representing client work, SaaS development, and private IP.
            </p>
          </div>
          <ExperienceTimeline />
        </motion.section>
      </main>

      <Footer />

      {/* Detail route modal */}
      <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />

      {/* Direct Contact Modal Drawer */}
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* About & Bio Modal Drawer */}
      <AboutDrawer isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}

export default App
