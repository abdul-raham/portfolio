import { ADDITIONAL_PROJECTS } from './additionalProjects'

export interface ProjectLanguage {
  name: string
  percentage: number
  color: string
}

export interface ProjectData {
  id: string
  title: string
  logoPath: string
  repoPath?: string
  displayDomain?: string
  category: 'Healthcare' | 'AI & ML' | 'SaaS' | 'Mobile' | 'DevOps & Tooling' | 'Education' | 'Commerce' | 'WordPress / CMS' | 'Websites'
  shortDescription: string
  fullDescription: string
  problemSolved: string
  architectureHighlights: string[]
  isPrivate: boolean
  isPlayStore?: boolean
  playStoreUrl?: string
  githubUrl?: string
  demoUrl?: string
  techStack: string[]
  languages: ProjectLanguage[]
  stars?: number
  updatedAt?: string
}

// Descriptions match each live site and its code; tech lists come from each project's own package files
// (checked 10 Nov 2026). The repositories are private, so there are no public code links.
const entry = (p: Omit<ProjectData, 'isPrivate' | 'languages'>): ProjectData => ({ ...p, isPrivate: true, languages: [] })

export const PROJECTS: ProjectData[] = [
  ...ADDITIONAL_PROJECTS,
  entry({
    id: 'doctech-global',
    title: 'DocTech Global',
    logoPath: '/logos/doctech.webp',
    displayDomain: 'doctechglobal.com.ng',
    category: 'Websites',
    shortDescription: 'The studio website for DocTech Global: services, process, work and contact.',
    fullDescription: 'The public website for DocTech Global, the design and engineering studio, with its services, process, selected work and team.',
    problemSolved: 'Shows clients what the studio builds and how it works, and gives them a direct way to start a project.',
    architectureHighlights: ['Next.js App Router', 'Three.js globe', 'Generated share images and sitemap'],
    demoUrl: 'https://doctechglobal.com.ng/',
    techStack: ['Next.js', 'TypeScript', 'Three.js'],
  }),
  entry({
    id: 'medaxis',
    title: 'MedAxis',
    logoPath: '/logos/medaxis.svg',
    displayDomain: 'medaxis.com.ng',
    category: 'Healthcare',
    shortDescription: 'Hospital software for Nigerian hospitals: patients, consultations, lab, pharmacy, billing and HMO claims.',
    fullDescription: 'MedAxis runs hospital operations from reception to follow-up: appointments, patient folders, consultations, lab results, pharmacy and billing with HMO claims.',
    problemSolved: 'Stops unbilled services and lost paperwork by keeping every patient visit, test and bill in one record.',
    architectureHighlights: ['Role-based staff workspaces', 'Billing with HMO claim tracking', 'Lab and pharmacy workflows'],
    demoUrl: 'https://medaxis.com.ng',
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
  }),
  entry({
    id: 'techcircle',
    title: 'TechCircle',
    logoPath: '/logos/techcircle.png',
    displayDomain: 'techcircle.com.ng',
    category: 'Commerce',
    shortDescription: 'A marketplace for genuine gadgets from trusted tech stores across Nigeria.',
    fullDescription: 'TechCircle brings trusted tech stores into one marketplace: customers search, chat with the store, inspect in person, then pay online or pick up.',
    problemSolved: 'Gives buyers a safer way to find genuine gadgets and gives stores an online shop without building their own.',
    architectureHighlights: ['Store and product listings', 'Buyer to store chat', 'Store dashboards and order flow'],
    demoUrl: 'https://techcircle.com.ng',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Three.js'],
  }),
  entry({
    id: 'kvc-platform',
    title: 'KVC Global Learning',
    logoPath: '/logos/kvc.webp',
    displayDomain: 'learnwithkvc.com',
    category: 'Education',
    shortDescription: 'Online tutoring for children, with assignments and progress tracking for parents.',
    fullDescription: 'KVC Global Learning connects families with tutors, tracks every session and assignment, and keeps parents informed of progress.',
    problemSolved: 'Gives parents a clear view of what their child is learning and how they are doing, session by session.',
    architectureHighlights: ['Parent, tutor and student accounts', 'Session and assignment tracking', 'Progress reports for parents'],
    demoUrl: 'https://learnwithkvc.com',
    techStack: ['React', 'Vite', 'Supabase', 'Tailwind CSS'],
  }),
  entry({
    id: 'opticonnect',
    title: 'OptiConnect',
    logoPath: '/logos/opticonnect.webp',
    category: 'Mobile',
    shortDescription: 'The app for OptiSmart camera owners: recharge camera SIM data, track orders, get alerts and reach support.',
    fullDescription: 'OptiConnect helps OptiSmart smart camera owners recharge SIM data, track camera orders, upload payment proof, receive alerts and reach support from one app.',
    problemSolved: 'Replaces phone calls and WhatsApp back-and-forth for camera owners with one place to manage their cameras.',
    architectureHighlights: ['Expo app for Android and iPhone', 'SIM data recharge and order tracking', 'Payment proof upload and alerts'],
    techStack: ['React Native', 'Expo', 'Supabase'],
  }),
  entry({
    id: 'rahlah',
    title: 'Rahlah Travels & Tours',
    logoPath: '/logos/rahlah.webp',
    displayDomain: 'rahlahtravelsandtours.com.ng',
    category: 'Mobile',
    shortDescription: 'Badal Umrah and Hajj services with verified agents in Makkah and Madinah, on the web and Google Play.',
    fullDescription: 'Rahlah connects families with verified agents in Makkah and Madinah for Badal Umrah and Hajj, with real-time updates and photo proof. Available on the web and as an Android app on Google Play.',
    problemSolved: 'Gives families proof that the rites they paid for were carried out, with updates at every step.',
    architectureHighlights: ['Booking website and Android app', 'Real-time progress updates', 'Photo proof from agents'],
    isPlayStore: true,
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.rahlah.mobile',
    demoUrl: 'https://rahlahtravelsandtours.com.ng/',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Firebase'],
  }),
  entry({
    id: 'zane',
    title: 'ZANE',
    logoPath: '/logos/zane.webp',
    displayDomain: 'zaneworldwide.vercel.app',
    category: 'Commerce',
    shortDescription: 'An online store for a premium streetwear label, with collections, a lookbook and a journal.',
    fullDescription: 'ZANE is the online store for a high-end streetwear label: product catalogue, collections and the archive, lookbook, shopping bag and checkout, plus an admin dashboard for products, orders, customers and delivery.',
    problemSolved: 'Lets the label sell directly online and run its own orders without a marketplace in between.',
    architectureHighlights: ['Storefront with collections and lookbook', 'Admin for products, orders and delivery', 'Motion-led design'],
    demoUrl: 'https://zaneworldwide.vercel.app/',
    techStack: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
  }),
  entry({
    id: 'zento',
    title: 'ZENTØ',
    logoPath: '/logos/zento.webp',
    displayDomain: 'zento.com.ng',
    category: 'Commerce',
    shortDescription: 'A WooCommerce store for a streetwear brand in Ibadan.',
    fullDescription: 'The online store for ZENTØ, a streetwear brand in Ibadan, with shop, collections and checkout.',
    problemSolved: 'Gives the brand its own shop that the team can update without a developer.',
    architectureHighlights: ['WooCommerce shop and checkout', 'Elementor page design', 'Product and collection pages'],
    demoUrl: 'https://zento.com.ng/',
    techStack: ['WordPress', 'WooCommerce', 'Elementor'],
  }),
  entry({
    id: 'ilmforge',
    title: 'IlmForge Institute',
    logoPath: '/logos/ilmforge.webp',
    displayDomain: 'ilmforge.com.ng',
    category: 'Education',
    shortDescription: 'Structured, self-paced Islamic courses with audio lessons, assessments and certificates.',
    fullDescription: 'IlmForge Institute teaches Islam through structured courses, readable and audio lessons, assessments and verified certificates, at a pace that lasts.',
    problemSolved: 'Gives learners a clear path through Islamic studies instead of scattered videos and notes.',
    architectureHighlights: ['Course and lesson player with audio', 'Assessments and progress tracking', 'Verifiable certificates'],
    demoUrl: 'https://ilmforge.com.ng/',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
  }),
  entry({
    id: 'documenta-ai',
    title: 'Documenta AI',
    logoPath: '/logos/documenta.webp',
    displayDomain: 'documenta-ai-fawn.vercel.app',
    category: 'AI & ML',
    shortDescription: 'PDF conversion, table extraction and document automation in one place.',
    fullDescription: 'Documenta AI handles everyday document work in one place, from merging and converting PDFs to pulling tables out of files and processing invoices.',
    problemSolved: 'Saves teams from juggling several single-purpose PDF tools and retyping data from documents.',
    architectureHighlights: ['Next.js web app', 'Python processing service', 'PDF, Word, Excel and image conversion'],
    demoUrl: 'https://documenta-ai-fawn.vercel.app/',
    techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Supabase'],
  }),
  entry({
    id: 'optismart',
    title: 'OptiSmart Portal',
    logoPath: '/logos/optismart.svg',
    displayDomain: 'sales.optismart.com.ng',
    category: 'SaaS',
    shortDescription: 'The sales and operations portal for OptiSmart Nigeria, a smart camera company.',
    fullDescription: 'The OptiSmart Portal runs the sales network of OptiSmart Nigeria: separate workspaces for admins, direct sales agents, resellers, outlets and installers, with products, orders and installations in one system.',
    problemSolved: 'Replaces spreadsheets and chats across the whole sales network with one system everyone works from.',
    architectureHighlights: ['Workspaces for agents, resellers, outlets and installers', 'Products, orders and installations', 'Maps for installation sites'],
    demoUrl: 'https://sales.optismart.com.ng',
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind CSS', 'Leaflet'],
  }),
  entry({
    id: 'moraladsemporium',
    title: "Marolad's Emporium",
    logoPath: '/logos/moralads.webp',
    category: 'Commerce',
    shortDescription: 'A luxury multi-vendor marketplace for fashion, accessories, beauty and lifestyle.',
    fullDescription: "Marolad's Emporium is a luxury multi-vendor marketplace offering curated premium products across fashion, accessories, beauty and lifestyle.",
    problemSolved: 'Gives premium sellers a shared, well-presented storefront and buyers one place to shop them.',
    architectureHighlights: ['Multi-vendor catalogue', 'Image compression on upload', 'Validated checkout forms'],
    techStack: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
  }),
  entry({
    id: 'bigschool-plus',
    title: 'BigSchool Plus',
    logoPath: '/logos/bigschool.webp',
    category: 'Education',
    shortDescription: 'An online academy for WAEC and BECE preparation, ICT skills and coding.',
    fullDescription: 'BigSchool Plus is an online academy for WAEC and Junior WAEC/BECE preparation, ICT skills and coding, with programme enrolment, timetables, class check-in, project submissions, scores and payments.',
    problemSolved: 'Runs enrolment, classes, assessment and fees for the academy in one place.',
    architectureHighlights: ['Student, tutor and admin workspaces', 'Paystack payments and renewals', 'AI study assistant'],
    techStack: ['React', 'Vite', 'Supabase', 'Firebase', 'Paystack', 'Tailwind CSS'],
  }),
]
