import { PROJECTS, type ProjectData } from './data/projectsData'

// Everything about the person and the page layout. Project details live in data/projectsData.ts.

export const profile = {
  name: 'Abdulrahman Temitayo Bakare',
  short: 'Abdulrahman Bakare',
  first: 'Abdulrahman',
  last: 'Bakare',
  role: 'Founder and software engineer',
  location: 'Lagos, Nigeria',
  email: 'Doctechglobalz@gmail.com',
  site: 'https://abdulrahmanbakare.com.ng',
  github: 'https://github.com/abdul-raham',
  linkedin: 'https://www.linkedin.com/in/abdulrahman-bakare-5958b5364/',
  education: 'Electronics and Computer Engineering, Lagos State University',
  intro:
    'I build the software businesses run on: hospital systems, school platforms, commerce, logistics and the websites that bring customers in. Engineer by training, product designer by instinct, founder by choice.',
}

export const ventures = [
  {
    name: 'DocTech Global',
    role: 'Co-Founder and Lead Engineer',
    since: '2024',
    text: 'A design and engineering studio building websites, web applications and business software.',
    href: 'https://doctechglobal.com.ng',
    logo: '/logos/doctech.svg',
  },
  {
    name: 'EtelectLabs',
    role: 'Co-founder, Product and Engineering',
    since: '2024',
    text: 'A product lab bringing engineering, product thinking and brand strategy together. Home of MedAxis.',
    // Its site is moving to Cloudflare; add the new address here once it is live.
    href: undefined as string | undefined,
    logo: '/logos/etelectlabs.png',
  },
  {
    name: 'MedAxis',
    role: 'Founder and CEO',
    since: '2024',
    text: 'Patient records, appointments, lab results, pharmacy and billing for hospitals, in one place.',
    href: 'https://medaxis.com.ng',
    logo: '/logos/medaxis.svg',
  },
  {
    name: 'TechCircle',
    role: 'Founder and CEO',
    since: '2023',
    text: 'A technology commerce network connecting vendors and customers through digital storefronts.',
    // techcircle.com.ng is offline (paused hosting). Put the link back once it is live again.
    href: undefined as string | undefined,
    logo: '/logos/techcircle.svg',
  },
]

// Live sites with a real screenshot, shown large on the home page. Descriptions match what each live site
// actually shows (checked 10 Nov 2026).
type Featured = {
  id: string
  image: string
  kind: string
  summary: string
  url: string
  domain: string
  tech?: string[]
  name?: string
}

export const featured: Featured[] = [
  {
    id: 'doctech-global',
    image: '/work/doctech-global.webp',
    kind: 'Studio website',
    summary: 'The DocTech Global site: an interactive globe, a project showcase and a guided enquiry flow, built with Next.js.',
    url: 'https://doctechglobal.com.ng/',
    domain: 'doctechglobal.com.ng',
    tech: ['Next.js', 'TypeScript', 'Three.js'],
  },
  {
    id: 'medaxis',
    image: '/work/medaxis.webp',
    kind: 'Hospital software',
    summary: 'Hospital operations from reception to follow-up: appointments, patient folders, consultations, lab results, pharmacy and billing with HMO claims.',
    url: 'https://medaxis.com.ng',
    domain: 'medaxis.com.ng',
  },
  {
    id: 'kvc-platform',
    image: '/work/kvc-platform.webp',
    kind: 'Education platform',
    summary: 'Online tutoring for children that connects families with tutors, tracks every session and keeps parents informed.',
    url: 'https://learnwithkvc.com',
    domain: 'learnwithkvc.com',
  },
  {
    id: 'ilmforge',
    image: '/work/ilmforge.webp',
    kind: 'Learning platform',
    summary: 'Structured, self-paced Islamic courses with audio and text lessons, progress tracking and certificates.',
    url: 'https://ilmforge.vercel.app/',
    domain: 'ilmforge.vercel.app',
  },
  {
    id: 'rahlah',
    image: '/work/rahlah.webp',
    kind: 'Booking platform and app',
    summary: 'Badal Umrah and Hajj services that connect families with verified agents in Makkah and Madinah, with real-time updates and photo proof.',
    url: 'https://rahlahtravelsandtours.com.ng/',
    domain: 'rahlahtravelsandtours.com.ng',
  },
  {
    id: 'documenta-ai',
    image: '/work/documenta-ai.webp',
    kind: 'AI document tools',
    summary: 'PDF conversion, table extraction and document automation in one place, from merging files to processing invoices.',
    url: 'https://documenta-ai-fawn.vercel.app/',
    domain: 'documenta-ai-fawn.vercel.app',
  },
  {
    id: 'zane',
    image: '/work/zane.webp',
    kind: 'Fashion e-commerce',
    summary: 'An online store for a premium streetwear label, with collections, a lookbook and a journal.',
    url: 'https://zaneworldwide.vercel.app/',
    domain: 'zaneworldwide.vercel.app',
    name: 'ZANE',
  },
  {
    id: 'lamis-logistics',
    image: '/work/lamis-logistics.webp',
    kind: 'Logistics website',
    summary: 'Courier, dispatch and haulage across Lagos and beyond, with coverage, tracking and quote requests.',
    url: 'https://lamisswiftlogisticsltd.com.ng',
    domain: 'lamisswiftlogisticsltd.com.ng',
  },
  {
    id: 'zento',
    image: '/work/zento.webp',
    kind: 'Fashion store',
    summary: 'A WooCommerce store for a streetwear brand in Ibadan, with shop, collections and checkout.',
    url: 'https://zento.com.ng/',
    domain: 'zento.com.ng',
    tech: ['WordPress', 'WooCommerce'],
  },
]

// These live sites are offline right now (paused hosting or no DNS), so they are listed without a link.
export const offline = new Set(['techcircle', 'optismart', 'moraladsemporium', 'bigschool-plus', 'opticonnect', 'hogarf'])

const featuredIds = new Set(featured.map((f) => f.id))

export type Project = ProjectData & { image?: string; kind?: string; summary: string; liveUrl?: string; domain?: string }

// One list for the whole site: featured details win over the older data where both exist.
export const projects: Project[] = PROJECTS.map((p) => {
  const f = featured.find((x) => x.id === p.id)
  const live = offline.has(p.id) ? undefined : p.demoUrl
  if (!f) return { ...p, summary: p.shortDescription, liveUrl: live, domain: live ? p.displayDomain : undefined }
  return {
    ...p,
    title: f.name ?? p.title,
    image: f.image,
    kind: f.kind,
    summary: f.summary,
    fullDescription: f.summary,
    liveUrl: f.url,
    domain: f.domain,
    techStack: f.tech ?? p.techStack,
  }
})

export const featuredProjects = featured.map((f) => projects.find((p) => p.id === f.id)!).filter(Boolean)
export const otherProjects = projects.filter((p) => !featuredIds.has(p.id))

export const stats = [
  { value: projects.length, suffix: '', label: 'Projects shipped' },
  { value: ventures.length, suffix: '', label: 'Companies founded or co-founded' },
  { value: new Date().getFullYear() - 2022, suffix: '+', label: 'Years building' },
]

export const skills = [
  { group: 'Front end', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Motion and interaction'] },
  { group: 'Back end', items: ['Node.js and Express', 'Python and FastAPI', '.NET', 'Go'] },
  { group: 'Data and infrastructure', items: ['PostgreSQL and Supabase', 'Redis', 'Docker and Linux', 'Cloudflare and Vercel'] },
  { group: 'Mobile and platforms', items: ['React Native and Expo', 'WordPress and WooCommerce', 'Paystack payments'] },
]
