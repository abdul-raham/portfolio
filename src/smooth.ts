import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Smooth scrolling for the whole site, off when the visitor asks for reduced motion.
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (lenis || reducedMotion()) return
  lenis = new Lenis({ autoRaf: true, lerp: 0.11 })
}

export function stopScroll(stop: boolean) {
  if (!lenis) return
  if (stop) lenis.stop()
  else lenis.start()
}

export function scrollToTarget(target: number | string, immediate = false) {
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(target, { immediate, force: true })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior })
  } else {
    document.querySelector(target)?.scrollIntoView()
  }
}
