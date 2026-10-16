export interface Cover {
  /** Path under /public, e.g. "/images/work/zivora.jpg". Leave out to show the gradient. */
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

export interface ParallaxQuote {
  label: string
  /** Each entry is shown on its own line. */
  lines: string[]
  by: string
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
  quote: ParallaxQuote
  /** Path of the résumé PDF under /public. */
  cvUrl: string
}

export interface NavItem {
  label: string
  /** Section id on the home page. */
  id: string
  href: string
}

export interface GalleryItem {
  cover: Cover
  caption: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: number
  role: string
  stack: string[]
  links?: {
    live?: string
    repo?: string
  }
  cover: Cover
  /** One or two sentences, shown under the title. */
  intro: string
  /** The overview paragraph on the project page. */
  summary: string
  /** Short statements about what was built. */
  highlights: string[]
  gallery: GalleryItem[]
}

export interface Service {
  index: string
  name: string
  description: string
  tags: string[]
}

export interface Role {
  index: string
  years: string
  title: string
  organisation: string
  description: string
  tags: string[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Post {
  slug: string
  /** Where the post was published, e.g. "LinkedIn". */
  platform: string
  title: string
  excerpt: string
  /** ISO date, e.g. "2026-09-12". */
  date: string
  /** Link to the original post on the platform. */
  url: string
  cover: Cover
  /** Paragraphs of the post text. */
  body: string[]
  /** One line pulled out of the post and shown large. */
  quote: string
}

export interface Testimonial {
  text: string
  author: string
  role: string
}
