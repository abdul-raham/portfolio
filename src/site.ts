import { PROJECTS, type ProjectData } from './data/projectsData'

// Everything about the person and the page layout. Project details live in data/projectsData.ts.

export const profile = {
  name: 'Abdulrahman Temitayo Bakare',
  short: 'Abdulrahman Bakare',
  first: 'Abdulrahman',
  last: 'Bakare',
  role: 'Co-founder, Co-CEO and software engineer',
  location: 'Lagos, Nigeria',
  email: 'abdulrahmanbakare001@gmail.com',
  site: 'https://abdulrahmanbakare.com.ng',
  github: 'https://github.com/abdul-raham',
  linkedin: 'https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/',
  education: 'Electronics and Computer Engineering, Lagos State University',
  intro:
    'I build the software businesses run on: hospital systems, school platforms, commerce, logistics and the websites that bring customers in. Engineer by training, product designer by instinct, founder by choice.',
}

// The two companies. MedAxis and TechCircle are products, listed with the rest of the work.
export const ventures = [
  {
    name: 'DocTech Global',
    role: 'Co-founder and Co-CEO',
    since: '2024',
    text: 'A design and engineering studio that builds websites, web applications and business software for organisations.',
    href: 'https://doctechglobal.com.ng',
    email: 'info@doctechglobal.com.ng',
    logo: '/logos/doctech.webp',
  },
  {
    name: 'EtelectLabs',
    role: 'Co-founder and Co-CEO',
    since: '2024',
    text: 'A product lab that brings engineering, product thinking and brand strategy together to build its own products, including MedAxis.',
    href: 'https://etelectlabs.org',
    email: 'info@etelectlabs.org',
    logo: '/logos/etelectlabs.png',
  },
]

// Products he built, shown first in the work.
export const products = ['medaxis', 'techcircle']

// Live sites shown large on the home page, each on a stage in its own brand colour with desktop and phone
// screenshots (public/work/<id>.webp and <id>-m.webp, captured 10 Nov 2026). Text comes from data/projectsData.ts.
// screen: the colour at the top of the site on a phone, used for the status bar above it.
type Featured = { id: string; kind: string; tone: string; screen: string }

export const featured: Featured[] = [
  { id: 'medaxis', kind: 'Hospital software', tone: '#1663c7', screen: '#ffffff' },
  { id: 'techcircle', kind: 'Tech marketplace', tone: '#1f5fff', screen: '#ffffff' },
  { id: 'loftyos', kind: 'School website and operating system', tone: '#1f6fd1', screen: '#264358' },
  { id: 'optismart', kind: 'Sales and operations portal', tone: '#1673e6', screen: '#f7f9fc' },
  { id: 'kvc-platform', kind: 'Education platform', tone: '#3c9a3c', screen: '#ffffff' },
  { id: 'ilmforge', kind: 'Learning platform', tone: '#0f7a5c', screen: '#eef2ed' },
  { id: 'rahlah', kind: 'Booking platform and app', tone: '#3f7a3a', screen: '#08140b' },
  { id: 'documenta-ai', kind: 'AI document tools', tone: '#4f6bff', screen: '#e5f1fb' },
  { id: 'zane', kind: 'Fashion e-commerce', tone: '#7b7f88', screen: '#040404' },
  { id: 'zento', kind: 'Fashion store', tone: '#8a8f99', screen: '#7e7e7e' },
]

// These live sites are offline right now (paused hosting), so they are listed without a link.
export const offline = new Set(['moraladsemporium', 'bigschool-plus', 'opticonnect'])

const featuredIds = new Set(featured.map((f) => f.id))

export type Project = ProjectData & { image?: string; phone?: string; tone?: string; screen?: string; kind?: string; summary: string; liveUrl?: string; domain?: string }

// One list for the whole site. DocTech Global is a company, shown under Companies, not a product.
const companySites = new Set(['doctech-global'])

export const projects: Project[] = PROJECTS.filter((p) => !companySites.has(p.id)).map((p) => {
  const live = offline.has(p.id) ? undefined : p.demoUrl
  const base = { ...p, summary: p.shortDescription, liveUrl: live, domain: live ? p.displayDomain : undefined }
  const f = featured.find((x) => x.id === p.id)
  if (!f) return base
  return { ...base, kind: f.kind, tone: f.tone, screen: f.screen, image: `/work/${p.id}.webp`, phone: `/work/${p.id}-m.webp` }
})

const productIds = new Set(products)
export const productProjects = products.map((id) => projects.find((p) => p.id === id)!).filter(Boolean)
export const featuredProjects = featured.filter((f) => !productIds.has(f.id)).map((f) => projects.find((p) => p.id === f.id)!).filter(Boolean)
export const otherProjects = projects.filter((p) => !featuredIds.has(p.id) && !productIds.has(p.id))

export const stats = [
  // All projects shipped, including client work not shown here (as he counts it, 11 Nov 2026).
  { value: 56, suffix: '', label: 'Projects shipped' },
  { value: ventures.length, suffix: '', label: 'Companies co-founded' },
  { value: new Date().getFullYear() - 2022, suffix: '+', label: 'Years building' },
]

export const skills = [
  { group: 'Front end', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Motion and interaction'] },
  { group: 'Back end', items: ['Node.js and Express', 'Python and FastAPI', '.NET', 'Go'] },
  { group: 'Data and infrastructure', items: ['PostgreSQL and Supabase', 'Redis', 'Docker and Linux', 'Cloudflare and Vercel'] },
  { group: 'Mobile and platforms', items: ['React Native and Expo', 'WordPress and WooCommerce', 'Paystack payments'] },
]
