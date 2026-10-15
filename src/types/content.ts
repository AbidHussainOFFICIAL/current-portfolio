export interface Cover {
  /** Path under /public, e.g. "/images/work/lumen-cover.jpg". Leave out to show the gradient. */
  src?: string
  alt: string
  /** CSS gradient used as the placeholder and as the fallback when src is missing. */
  gradient: string
}

export interface Social {
  label: string
  url: string
}

export interface Stat {
  value: number
  suffix?: string
  label: string
}

export interface MetaRow {
  label: string
  value: string
}

export interface SiteConfig {
  name: string
  role: string
  city: string
  country: string
  /** IANA time zone used by the live clock. */
  timezone: string
  email: string
  /** Public site URL, no trailing slash. */
  url: string
  /** Default meta description. */
  description: string
  availability: {
    open: boolean
    label: string
  }
  intro: string
  portrait: Cover
  socials: Social[]
  stats: Stat[]
  marquee: string[]
  about: {
    statement: string
    paragraphs: string[]
    meta: MetaRow[]
  }
  cvUrl: string
}

export interface NavItem {
  label: string
  /** Section id on the home page. */
  id: string
  href: string
}

export interface Metric {
  value: string
  label: string
}

export interface ProjectQuote {
  text: string
  author: string
  role: string
}

export interface GalleryItem {
  cover: Cover
  caption?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: number
  featured: boolean
  client: string
  role: string
  timeline: string
  stack: string[]
  links?: {
    live?: string
    repo?: string
  }
  cover: Cover
  intro: string
  challenge: string
  approach: string
  result: string
  metrics?: Metric[]
  gallery: GalleryItem[]
  quote?: ProjectQuote
}

export interface Service {
  index: string
  name: string
  description: string
  tags: string[]
}

export interface Role {
  years: string
  title: string
  company: string
  current?: boolean
}

export interface Certificate {
  title: string
  issuer: string
  year: number
  credentialId: string
  /** Verification link. Leave out when there is none. */
  url?: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  tag: string
  /** ISO date, e.g. "2026-09-12". */
  date: string
  readingTime: string
  cover: Cover
}

export interface Testimonial {
  text: string
  author: string
  role: string
}
