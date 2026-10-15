import type { Cover, GalleryItem, Project } from "@/types/content"

// Placeholder projects. Replace covers (src) and text with real work later.

const gradient = (from: string, to: string, deg = 135) =>
  `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`

const cover = (alt: string, from: string, to: string, deg = 135): Cover => ({
  alt,
  gradient: gradient(from, to, deg),
})

const gallery = (name: string, from: string, to: string): GalleryItem[] => [
  { cover: cover(`${name} overview`, from, to, 135), caption: "Overview" },
  { cover: cover(`${name} detail`, to, from, 200), caption: "Detail view" },
  { cover: cover(`${name} mobile`, from, "#0b0b0c", 160), caption: "On mobile" },
]

export const projects: Project[] = [
  {
    slug: "lumen-optics",
    title: "Lumen Optics",
    category: "E-commerce",
    year: 2025,
    featured: true,
    client: "Lumen Optics",
    role: "Design and full-stack development",
    timeline: "10 weeks",
    stack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Motion"],
    links: { live: "https://example.com/lumen-optics" },
    cover: cover("Lumen Optics store", "#1d3a35", "#0b0b0c"),
    intro:
      "A premium online store for an independent eyewear brand, built around large photography and a fast, calm checkout.",
    challenge:
      "The brand's previous store was slow, hard to use on phones and did little justice to the product photography. Most visitors left before the second page.",
    approach:
      "I rebuilt the store in Next.js with server-rendered product pages, an image pipeline that serves modern formats, and a one-page checkout. The interface keeps chrome to a minimum so the frames take centre stage.",
    result:
      "Pages load in under a second on a mid-range phone, the checkout is shorter by two steps, and the owners now update products themselves without help.",
    metrics: [
      { value: "+38%", label: "Conversion rate" },
      { value: "0.9s", label: "Largest Contentful Paint" },
      { value: "-41%", label: "Cart abandonment" },
    ],
    gallery: gallery("Lumen Optics", "#1d3a35", "#0b0b0c"),
    quote: {
      text: "Alex took a vague brief and turned it into a store we are proud of. Sales moved the week it launched.",
      author: "Maya Lindqvist",
      role: "Founder, Lumen Optics",
    },
  },
  {
    slug: "marginalia",
    title: "Marginalia",
    category: "Editorial platform",
    year: 2025,
    featured: true,
    client: "Marginalia Press",
    role: "Front-end development and design system",
    timeline: "8 weeks",
    stack: ["Next.js", "MDX", "Tailwind CSS", "Sanity"],
    links: { live: "https://example.com/marginalia" },
    cover: cover("Marginalia reading view", "#33281d", "#0b0b0c"),
    intro:
      "A reading-first publishing platform for long-form essays, with margin notes and a distraction-free layout.",
    challenge:
      "The publisher wanted essays to feel like a printed book on screen, with annotations that work on both desktop and phones.",
    approach:
      "I designed a typographic system tuned for long reading, built margin notes as inline asides on small screens and true margin notes on wide ones, and connected the whole thing to a headless CMS.",
    result:
      "Average reading time per visit doubled and editors publish new essays without involving a developer.",
    metrics: [
      { value: "2x", label: "Average reading time" },
      { value: "98", label: "Lighthouse accessibility" },
    ],
    gallery: gallery("Marginalia", "#33281d", "#0b0b0c"),
  },
  {
    slug: "halcyon-market",
    title: "Halcyon Market",
    category: "Marketplace",
    year: 2024,
    featured: true,
    client: "Halcyon",
    role: "Full-stack development",
    timeline: "14 weeks",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe Connect", "Redis"],
    cover: cover("Halcyon Market listings", "#1c2a3a", "#0b0b0c"),
    intro:
      "A marketplace connecting independent makers with buyers, including seller onboarding, payouts and messaging.",
    challenge:
      "Two sides of a marketplace need two different experiences, and payouts to sellers in several countries add real complexity.",
    approach:
      "I split the product into a buyer storefront and a seller dashboard on one shared design system, and used Stripe Connect for onboarding and payouts with webhooks that keep orders and balances in sync.",
    result:
      "The marketplace launched with 120 sellers and processes payouts automatically with no manual reconciliation.",
    metrics: [
      { value: "120", label: "Sellers at launch" },
      { value: "0", label: "Manual payouts" },
    ],
    gallery: gallery("Halcyon Market", "#1c2a3a", "#0b0b0c"),
  },
  {
    slug: "signal-atlas",
    title: "Signal Atlas",
    category: "Data visualisation",
    year: 2024,
    featured: true,
    client: "Signal Atlas Research",
    role: "Front-end development and interaction design",
    timeline: "9 weeks",
    stack: ["React", "TypeScript", "D3", "Vite"],
    links: { live: "https://example.com/signal-atlas" },
    cover: cover("Signal Atlas map", "#2a1d3a", "#0b0b0c"),
    intro:
      "An interactive atlas that maps network coverage data across regions, built for researchers and journalists.",
    challenge:
      "Millions of data points had to stay explorable in the browser without the page stuttering.",
    approach:
      "I pre-aggregated the data into tiles, rendered with canvas for the dense layers and SVG for labels, and added keyboard-friendly controls with clear legends.",
    result:
      "The atlas stays smooth on ordinary laptops and has been cited in several published reports.",
    metrics: [
      { value: "2M+", label: "Points rendered" },
      { value: "60fps", label: "Pan and zoom" },
    ],
    gallery: gallery("Signal Atlas", "#2a1d3a", "#0b0b0c"),
  },
  {
    slug: "northwind-console",
    title: "Northwind Console",
    category: "SaaS dashboard",
    year: 2024,
    featured: true,
    client: "Northwind",
    role: "UI design and front-end development",
    timeline: "12 weeks",
    stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Tailwind CSS"],
    cover: cover("Northwind Console dashboard", "#1d333a", "#0b0b0c"),
    intro:
      "An operations dashboard for a logistics team, turning scattered spreadsheets into one live view.",
    challenge:
      "Dispatchers needed to see delays and exceptions at a glance, and the old tools hid them in tables.",
    approach:
      "I designed a dense but readable interface with status-first layouts, saved filters and keyboard shortcuts, backed by typed APIs and real-time updates.",
    result:
      "Dispatchers resolve exceptions faster and the team retired three separate spreadsheets.",
    metrics: [
      { value: "-35%", label: "Time to resolve exceptions" },
      { value: "3", label: "Spreadsheets retired" },
    ],
    gallery: gallery("Northwind Console", "#1d333a", "#0b0b0c"),
  },
  {
    slug: "tidal",
    title: "Tidal",
    category: "Mobile web app",
    year: 2023,
    featured: true,
    client: "Tidal Wellness",
    role: "Design and front-end development",
    timeline: "7 weeks",
    stack: ["Next.js", "PWA", "TypeScript", "Motion"],
    links: { live: "https://example.com/tidal" },
    cover: cover("Tidal app screens", "#1d2a3a", "#0b0b0c"),
    intro:
      "A calm habit-tracking progressive web app that works offline and feels native on a phone.",
    challenge:
      "The app had to feel as smooth as a native one while staying a single web codebase, including when offline.",
    approach:
      "I built it as an installable PWA with a local-first data layer, gentle motion for feedback and large touch targets for one-handed use.",
    result:
      "Users install it straight from the browser and keep their streaks even without a connection.",
    metrics: [
      { value: "4.8", label: "Average store rating" },
      { value: "100%", label: "Works offline" },
    ],
    gallery: gallery("Tidal", "#1d2a3a", "#0b0b0c"),
  },
  {
    slug: "orbit-pay",
    title: "Orbit Pay",
    category: "Fintech",
    year: 2023,
    featured: false,
    client: "Orbit",
    role: "Front-end development",
    timeline: "6 weeks",
    stack: ["React", "TypeScript", "Node.js"],
    cover: cover("Orbit Pay checkout", "#33211d", "#0b0b0c"),
    intro: "A payment links product that lets small businesses get paid with a single URL.",
    challenge:
      "The checkout had to feel trustworthy and work flawlessly on low-end phones and slow networks.",
    approach:
      "I kept the payment flow to one screen, validated inputs inline and trimmed the bundle until it loaded quickly on weak connections.",
    result: "Checkout completion rose and support tickets about failed payments dropped.",
    metrics: [{ value: "+22%", label: "Checkout completion" }],
    gallery: gallery("Orbit Pay", "#33211d", "#0b0b0c"),
  },
  {
    slug: "paperkite",
    title: "Paperkite",
    category: "Brand website",
    year: 2022,
    featured: false,
    client: "Paperkite Studio",
    role: "Design and development",
    timeline: "4 weeks",
    stack: ["Next.js", "Tailwind CSS", "Motion"],
    cover: cover("Paperkite homepage", "#2a331d", "#0b0b0c"),
    intro: "A playful brand site for a stationery studio, with illustrated transitions between pages.",
    challenge: "The studio wanted personality without sacrificing speed or accessibility.",
    approach:
      "I used lightweight illustrated SVGs, short page transitions and a simple content model the owner can edit.",
    result: "The site launched on time and became the studio's main sales channel.",
    gallery: gallery("Paperkite", "#2a331d", "#0b0b0c"),
  },
  {
    slug: "foundry",
    title: "Foundry",
    category: "Design system",
    year: 2022,
    featured: false,
    client: "Foundry Labs",
    role: "Design system and front-end development",
    timeline: "8 weeks",
    stack: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
    cover: cover("Foundry component library", "#33331d", "#0b0b0c"),
    intro: "A shared component library that unified three product teams on one visual language.",
    challenge:
      "Three products had drifted apart, with duplicated components and inconsistent accessibility.",
    approach:
      "I audited the existing interfaces, defined tokens and primitives, and shipped documented, accessible components in Storybook with clear migration notes.",
    result: "Teams ship new screens faster and accessibility issues fell sharply.",
    metrics: [{ value: "60+", label: "Components" }],
    gallery: gallery("Foundry", "#33331d", "#0b0b0c"),
  },
]
