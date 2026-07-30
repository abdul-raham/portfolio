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
  category: 'Healthcare' | 'AI & ML' | 'SaaS' | 'Mobile' | 'DevOps & Tooling' | 'Education' | 'Commerce' | 'WordPress / CMS'
  shortDescription: string
  fullDescription: string
  problemSolved: string
  architectureHighlights: string[]
  isPrivate: boolean
  isPlayStore?: boolean
  playStoreUrl?: string
  githubUrl?: string
  demoUrl: string
  techStack: string[]
  languages: ProjectLanguage[]
  stars?: number
  updatedAt: string
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'doctech-global',
    title: 'DocTech Global',
    logoPath: '/logos/doctech.svg',
    displayDomain: 'doctechglobal.com.ng',
    category: 'SaaS',
    shortDescription: 'Enterprise software architecture, B2B digital infrastructure & document intelligence suite.',
    fullDescription: 'DocTech Global is an enterprise technology provider building high-performance B2B digital systems, document automation platforms, and custom software architecture.',
    problemSolved: 'Transforms complex operational workflows into high-fidelity software systems built for scale and security.',
    architectureHighlights: [
      'Microservices architecture & high-throughput REST APIs',
      'Document intelligence & automated pipeline parsers',
      'Zero-downtime containerized cloud deployment'
    ],
    isPrivate: true,
    demoUrl: 'https://doctechglobal.com.ng/',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    languages: [
      { name: 'TypeScript', percentage: 78.5, color: '#3178c6' },
      { name: 'Node.js', percentage: 14.5, color: '#339933' },
      { name: 'Docker', percentage: 7.0, color: '#384d54' }
    ],
    updatedAt: '2026-07'
  },
  {
    id: 'medaxis',
    title: 'MedAxis',
    logoPath: '/logos/medaxis.svg',
    repoPath: 'abdul-raham/MedAxis',
    displayDomain: 'medaxis-nine.vercel.app',
    category: 'Healthcare',
    shortDescription: 'Modern Hospital OS engineered for Nigerian healthcare workflows, HMO claims tracking, and zero revenue leaks.',
    fullDescription: 'MedAxis is a high-fidelity hospital OS built specifically for Nigerian hospitals. It replaces clunky legacy systems with a fast, minimalist interface designed to eliminate administrative friction, simplify HMO claims tracking, and safeguard hospital revenue.',
    problemSolved: 'Eliminates revenue leaks from unbilled services and speeds up patient encounter logging with real-time digital billing validation.',
    architectureHighlights: [
      'Sub-second clinical encounter documentation engine',
      'Integrated HMO billing code matrix & claim status tracking',
      'HIPAA/GDPR compliant audit logs & patient timeline visualization'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/MedAxis',
    demoUrl: 'https://medaxis-nine.vercel.app',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    languages: [
      { name: 'TypeScript', percentage: 74.2, color: '#3178c6' },
      { name: 'TSX/React', percentage: 17.8, color: '#61dafb' },
      { name: 'CSS', percentage: 5.4, color: '#563d7c' },
      { name: 'Docker', percentage: 2.6, color: '#384d54' }
    ],
    updatedAt: '2026-07'
  },
  {
    id: 'techcircle',
    title: 'TechCircle',
    logoPath: '/logos/techcircle.svg',
    repoPath: 'abdul-raham/TechCircle',
    displayDomain: 'techcircle.com.ng',
    category: 'Commerce',
    shortDescription: 'Technology commerce network connecting vendors and customers through digital storefronts.',
    fullDescription: 'TechCircle powers a digital commerce network enabling hardware & tech equipment vendors to deploy storefronts, monitor inventory visibility in real time, and establish trusted buyer communications.',
    problemSolved: 'Replaces disjointed messaging apps with direct vendor storefronts, verified inventory status, and automated order notifications.',
    architectureHighlights: [
      'Multi-vendor catalog indexing engine',
      'Real-time inventory sync & stock reservation',
      'Instant WhatsApp/Email transactional alert triggers'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/TechCircle',
    demoUrl: 'https://techcircle.com.ng',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    languages: [
      { name: 'TypeScript', percentage: 69.5, color: '#3178c6' },
      { name: 'JavaScript', percentage: 20.1, color: '#f1e05a' },
      { name: 'HTML/CSS', percentage: 10.4, color: '#e34c26' }
    ],
    updatedAt: '2026-07'
  },
  {
    id: 'kvc-platform',
    title: 'KVC Platform',
    logoPath: '/logos/kvc.svg',
    repoPath: 'abdul-raham/kvc-platform',
    displayDomain: 'learnwithkvc.com',
    category: 'Education',
    shortDescription: 'Knowledge & Value Creation portal for academic research & structured learning.',
    fullDescription: 'KVC Platform provides institutional research repositories, course delivery, document versioning, and collaborative peer-review workflows.',
    problemSolved: 'Streamlines academic asset indexing and multi-author review tracking.',
    architectureHighlights: [
      'Granular document permission layers',
      'High-speed course content delivery network',
      'Responsive minimalist interface'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/kvc-platform',
    demoUrl: 'https://learnwithkvc.com',
    techStack: ['React', 'TypeScript', 'Node.js', 'Elasticsearch'],
    languages: [
      { name: 'TypeScript', percentage: 75.0, color: '#3178c6' },
      { name: 'HTML/CSS', percentage: 15.0, color: '#e34c26' },
      { name: 'Shell', percentage: 10.0, color: '#89e051' }
    ],
    updatedAt: '2026-07'
  },
  {
    id: 'opticonnect',
    title: 'OptiConnect',
    logoPath: '/logos/opticonnect.svg',
    repoPath: 'abdul-raham/Opticonnect',
    displayDomain: 'opticonnect.optismart.com.ng',
    category: 'Mobile',
    shortDescription: 'Enterprise connectivity, mobile app & webhook proxy middleware available on Google Play Store.',
    fullDescription: 'OptiConnect connects mobile clients and backend microservices with real-time payload transformation, offline queue synchronization, and Google Play Store deployment.',
    problemSolved: 'Prevents payload dropping during mobile network outages or recipient service maintenance.',
    architectureHighlights: [
      'Stream buffer payload normalization',
      'Google Play Store production application build',
      'Redis queue backpressure throttle'
    ],
    isPrivate: false,
    isPlayStore: true,
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.opticonnect.app',
    githubUrl: 'https://github.com/abdul-raham/Opticonnect',
    demoUrl: 'https://opticonnect.optismart.com.ng/',
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Redis', 'Android SDK'],
    languages: [
      { name: 'TypeScript', percentage: 86.4, color: '#3178c6' },
      { name: 'Java/Android', percentage: 8.6, color: '#b0a4e3' },
      { name: 'Shell', percentage: 5.0, color: '#89e051' }
    ],
    updatedAt: '2026-06'
  },
  {
    id: 'rahlah',
    title: 'Rahlah Travels & Tours',
    logoPath: '/logos/rahlah.svg',
    repoPath: 'abdul-raham/rahlah',
    displayDomain: 'rahlahtravelsandtours.com.ng',
    category: 'Mobile',
    shortDescription: 'Cross-platform travel companion & tour logistics application available on Google Play Store.',
    fullDescription: 'Rahlah Travels provides spatial tracking, offline vector map rendering, and tour route planning for travelers. Published and active on Google Play Store.',
    problemSolved: 'Solves heavy battery drain and map tile loading failures in remote areas using lightweight native SQLite spatial index buffers.',
    architectureHighlights: [
      'React Native / Expo mobile architecture',
      'Google Play Store production application build',
      'Native C++ SQLite bindings for offline spatial data indexing'
    ],
    isPrivate: false,
    isPlayStore: true,
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.rahlah.app',
    githubUrl: 'https://github.com/abdul-raham/rahlah',
    demoUrl: 'https://rahlahtravelsandtours.com.ng/',
    techStack: ['React Native', 'TypeScript', 'C++', 'Expo', 'Google Play API'],
    languages: [
      { name: 'TypeScript', percentage: 78.4, color: '#3178c6' },
      { name: 'C++', percentage: 13.6, color: '#f34b7d' },
      { name: 'Java/Swift', percentage: 8.0, color: '#b0a4e3' }
    ],
    updatedAt: '2026-06'
  },
  {
    id: 'zane',
    title: 'Zane Worldwide',
    logoPath: '/logos/zane.svg',
    repoPath: 'Dev-Bolarinwa/Zane1.0',
    displayDomain: 'zaneworldwide.vercel.app',
    category: 'DevOps & Tooling',
    shortDescription: 'Container health daemon, cloud deployment pipeline, and automated web portal.',
    fullDescription: 'Deployment pipeline and web portal for containerized microservices featuring zero-downtime rolling updates and automated SSL renewal.',
    problemSolved: 'Eliminates complex server deployment overhead for cloud applications.',
    architectureHighlights: [
      'Golang binary deployment engine',
      'Automated Caddy reverse proxy SSL provider'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/Dev-Bolarinwa/Zane1.0',
    demoUrl: 'https://zaneworldwide.vercel.app/',
    techStack: ['Go', 'Docker', 'Linux', 'React', 'Caddy'],
    languages: [
      { name: 'Go', percentage: 85.0, color: '#00ADD8' },
      { name: 'TypeScript', percentage: 10.5, color: '#3178c6' },
      { name: 'Dockerfile', percentage: 4.5, color: '#384d54' }
    ],
    updatedAt: '2026-06'
  },
  {
    id: 'zento',
    title: 'ZENTØ',
    logoPath: '/logos/zento.svg',
    displayDomain: 'zento.com.ng',
    category: 'Commerce',
    shortDescription: 'E-commerce platform & custom WordPress architecture engineered for high-volume retail.',
    fullDescription: 'ZENTØ is an e-commerce platform built on a custom WordPress & WooCommerce engine with optimized caching layers, payment gateways, and responsive UI components.',
    problemSolved: 'Optimizes e-commerce checkout and page render times down to sub-second load thresholds while maintaining non-technical product management ease.',
    architectureHighlights: [
      'Custom PHP WooCommerce theme & checkout hooks',
      'Redis object caching integration',
      'Paystack & Stripe multi-currency payment pipeline'
    ],
    isPrivate: false,
    demoUrl: 'https://zento.com.ng/',
    techStack: ['WooCommerce', 'WordPress', 'PHP', 'JavaScript', 'CSS3', 'MySQL'],
    languages: [
      { name: 'PHP', percentage: 68.0, color: '#4F5D95' },
      { name: 'JavaScript', percentage: 18.0, color: '#f1e05a' },
      { name: 'CSS', percentage: 14.0, color: '#563d7c' }
    ],
    updatedAt: '2026-05'
  },
  {
    id: 'ilmforge',
    title: 'IlmForge',
    logoPath: '/logos/ilmforge.svg',
    repoPath: 'abdul-raham/-ilmforge',
    displayDomain: 'ilmforge.vercel.app',
    category: 'Education',
    shortDescription: 'Educational platform & course generator with dynamic programmatic SEO & schema tags.',
    fullDescription: 'IlmForge is an intelligent learning platform engineered for organic search visibility. Features automated JSON-LD schema injection, dynamic sitemaps, and structured learning pathways.',
    problemSolved: 'Drives maximum search engine indexing through automated OpenGraph renders and canonical link controls.',
    architectureHighlights: [
      'Next.js App Router SSR & static optimization',
      'Programmatic Schema.org JSON-LD tag generator'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/-ilmforge',
    demoUrl: 'https://ilmforge.vercel.app/',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'JSON-LD'],
    languages: [
      { name: 'TypeScript', percentage: 71.0, color: '#3178c6' },
      { name: 'JavaScript', percentage: 18.2, color: '#f1e05a' },
      { name: 'CSS', percentage: 10.8, color: '#563d7c' }
    ],
    updatedAt: '2026-05'
  },
  {
    id: 'documenta-ai',
    title: 'Documenta AI',
    logoPath: '/logos/documenta.svg',
    repoPath: 'abdul-raham/Documenta-AI',
    displayDomain: 'documenta-ai-fawn.vercel.app',
    category: 'AI & ML',
    shortDescription: 'Document intelligence & LLM extraction engine using OCR parsers and function calling.',
    fullDescription: 'Documenta AI automates invoice, contract, and identity document parsing by mapping unstructured text into targeted JSON schemas.',
    problemSolved: 'Replaces manual document entry with 99%+ schema-validated extraction accuracy.',
    architectureHighlights: [
      'Multi-provider LLM orchestration (Gemini, Claude, OpenAI)',
      'Async task processing via BullMQ workers'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/Documenta-AI',
    demoUrl: 'https://documenta-ai-fawn.vercel.app/',
    techStack: ['Python', 'FastAPI', 'TypeScript', 'React', 'PyTorch'],
    languages: [
      { name: 'Python', percentage: 61.2, color: '#3572A5' },
      { name: 'TypeScript', percentage: 28.5, color: '#3178c6' },
      { name: 'Docker', percentage: 10.3, color: '#384d54' }
    ],
    updatedAt: '2026-05'
  },
  {
    id: 'optismart',
    title: 'OptiSmart Portal',
    logoPath: '/logos/optismart.svg',
    repoPath: 'abdul-raham/Optismart',
    displayDomain: 'optismart-sigma.vercel.app',
    category: 'SaaS',
    shortDescription: 'Enterprise operations portal with WebSocket telemetry streaming & analytics widgets.',
    fullDescription: 'OptiSmart is a SaaS platform providing organizations with automated resource optimization, low-latency metric widgets, and RBAC security.',
    problemSolved: 'Consolidates multi-department operational telemetry into single-page real-time dashboards.',
    architectureHighlights: [
      'Micro-frontend widget registry pattern',
      'WebSocket sub-second data streaming'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/Optismart',
    demoUrl: 'https://optismart-sigma.vercel.app/',
    techStack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Redis'],
    languages: [
      { name: 'TypeScript', percentage: 65.5, color: '#3178c6' },
      { name: 'Python', percentage: 21.0, color: '#3572A5' },
      { name: 'CSS', percentage: 13.5, color: '#563d7c' }
    ],
    updatedAt: '2026-04'
  },
  {
    id: 'moraladsemporium',
    title: "Moralad's Emporium",
    logoPath: '/logos/moralads.svg',
    repoPath: 'abdul-raham/Moraladsemporium',
    displayDomain: 'maroladsemporium.vercel.app',
    category: 'Commerce',
    shortDescription: 'E-commerce platform with automated payment gateway & catalog search.',
    fullDescription: 'Modern digital storefront equipped with Paystack payment integration, order tracking, and high-speed product catalog search.',
    problemSolved: 'Provides instant online checkout and receipt generation for retail clients.',
    architectureHighlights: [
      'Paystack webhook payment verification',
      'Responsive product gallery & order queue'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/Moraladsemporium',
    demoUrl: 'https://maroladsemporium.vercel.app/',
    techStack: ['React', 'TypeScript', 'Node.js', 'Paystack API'],
    languages: [
      { name: 'TypeScript', percentage: 76.5, color: '#3178c6' },
      { name: 'CSS', percentage: 14.2, color: '#563d7c' },
      { name: 'JavaScript', percentage: 9.3, color: '#f1e05a' }
    ],
    updatedAt: '2026-04'
  },
  {
    id: 'bigschool-plus',
    title: 'Bigschool Plus',
    logoPath: '/logos/bigschool.svg',
    repoPath: 'abdul-raham/Bigschool-plus',
    displayDomain: 'bigschool-plus.vercel.app',
    category: 'Education',
    shortDescription: 'Institutional school management suite with gradebooks & parent messaging.',
    fullDescription: 'Connected educational web portal providing administrators, teachers, and parents with centralized attendance, grade reports, and tuition logs.',
    problemSolved: 'Replaces paper grade sheets with secure digital gradebook synchronization.',
    architectureHighlights: [
      'Role-segregated administrative access matrix',
      'Report card PDF export service'
    ],
    isPrivate: false,
    githubUrl: 'https://github.com/abdul-raham/Bigschool-plus',
    demoUrl: 'https://bigschool-plus.vercel.app/',
    techStack: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'TailwindCSS'],
    languages: [
      { name: 'PHP', percentage: 63.4, color: '#4F5D95' },
      { name: 'Vue', percentage: 22.6, color: '#41b883' },
      { name: 'Blade/HTML', percentage: 14.0, color: '#f05340' }
    ],
    updatedAt: '2026-04'
  }
]
