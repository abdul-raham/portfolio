import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { projects, type Project } from './site'
import { startSmoothScroll } from './smooth'
import { Contact, Hero, Index, Intro, Products, ProjectPanel, Search, Stack, TopBar, Ventures, Work } from './components/site/Site'
import { Journey } from './components/site/Journey'

// Project details open over the page at #/project/<id>, the address the previous site used too.
const fromHash = () => {
  const match = window.location.hash.match(/^#\/project\/(.+)$/)
  return match ? projects.find((p) => p.id === match[1]) ?? null : null
}

export default function App() {
  const [open, setOpen] = useState<Project | null>(fromHash)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    startSmoothScroll()
    const onHash = () => setOpen(fromHash())
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
    }
  }, [])

  const show = useCallback((p: Project) => {
    window.history.pushState(null, '', `#/project/${p.id}`)
    setOpen(p)
  }, [])

  const close = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    setOpen(null)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <TopBar onSearch={() => setSearching(true)} />
      <main>
        <Hero />
        <Intro />
        <Ventures />
        <Products onOpen={show} />
        <Work onOpen={show} />
        <Index onOpen={show} />
        <Journey />
        <Stack />
      </main>
      <Contact />
      <AnimatePresence>{open && <ProjectPanel key="panel" project={open} onClose={close} onOpen={show} />}</AnimatePresence>
      <Search open={searching} setOpen={setSearching} onOpen={show} />
    </MotionConfig>
  )
}
