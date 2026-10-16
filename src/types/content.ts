export interface Cover {
  /** Path under /public, e.g. "/images/work/zivora-cover.jpg". Replace the file to swap the picture. */
  src: string
  alt: string
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

/** A code excerpt shown with syntax highlighting on a project page. */
export interface CodeSnippet {
  /** Short heading, e.g. "Merging the class names". */
  title: string
  /** One or two sentences about what the code does and why. */
  description: string
  /** Name shown in the header of the code block. */
  filename: string
  /** shiki language id, e.g. "ts", "tsx", "js". */
  language: string
  /** Inline code. Use this OR `file`. */
  code?: string
  /** Path of a real file in this repository, read at build time, e.g. "src/lib/cn.ts". */
  file?: string
  /** True while the code is a placeholder. A "Placeholder" badge is shown on the page. */
  dummy?: boolean
}

export interface Decision {
  title: string
  text: string
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
  /** The brief: the overview paragraph on the project page. */
  summary: string
  /** What the project does, one short line each. */
  features: string[]
  /** Technical choices and the reason for each. */
  decisions: Decision[]
  /** What building it taught me, one short line each. */
  learned: string[]
  snippets: CodeSnippet[]
  /** Pictures shown on the project page. Three are expected. */
  gallery: Cover[]
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

export interface Certificate {
  year: string
  title: string
  issuer: string
  /** Short type shown in the middle column, e.g. "Certificate" or "Course". */
  type: string
}

export interface Testimonial {
  text: string
  author: string
  role: string
}
