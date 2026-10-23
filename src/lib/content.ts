import { certificates as certificatesEn } from "@/content/certificates"
import { experience as experienceEn } from "@/content/experience"
import { posts as postsEn } from "@/content/posts"
import { projects as projectsEn } from "@/content/projects"
import { services as servicesEn } from "@/content/services"
import { site as siteEn } from "@/content/site"
import { skills as skillsEn } from "@/content/skills"
import { testimonials as testimonialsEn } from "@/content/testimonials"
import { siteUr } from "@/content/ur/site"
import { projectsUr } from "@/content/ur/projects"
import { postsUr } from "@/content/ur/posts"
import {
  certificatesUr,
  experienceUr,
  servicesUr,
  skillsUr,
  testimonialsUr,
} from "@/content/ur/lists"
import type { Locale } from "@/i18n/config"
import { digits } from "@/lib/format"
import type {
  Certificate,
  Post,
  Project,
  Role,
  Service,
  SiteConfig,
  SkillGroup,
  Testimonial,
} from "@/types/content"

/**
 * The content layer. The English files in src/content are the source of truth: they hold every link,
 * date, number, tech name and picture. A translation (src/content/ur) only replaces the words, and a
 * missing translation falls back to the English text, so nothing can ever come out empty.
 */

/** Item i of an overlay list, or undefined when the overlay is shorter than the base list. */
function at<T>(list: readonly T[] | undefined, index: number): T | undefined {
  return list?.[index]
}

/* ------------------------------ site ------------------------------ */

export function getSite(locale: Locale): SiteConfig {
  if (locale !== "ur") return siteEn
  const t = siteUr
  return {
    ...siteEn,
    name: t.name,
    role: t.role,
    city: t.city,
    country: t.country,
    description: t.description,
    intro: t.intro,
    portrait: { ...siteEn.portrait, alt: t.portraitAlt },
    stats: siteEn.stats.map((stat, i) => ({ ...stat, label: at(t.statLabels, i) ?? stat.label })),
    about: t.about,
    quote: t.quote,
  }
}

/* ----------------------------- projects ---------------------------- */

function localizeProject(project: Project, locale: Locale): Project {
  if (locale !== "ur") return project
  const t = projectsUr[project.slug]
  if (!t) return project
  return {
    ...project,
    title: t.title,
    category: t.category,
    role: t.role,
    intro: t.intro,
    summary: t.summary,
    features: t.features,
    decisions: t.decisions,
    learned: t.learned,
    cover: { ...project.cover, alt: t.coverAlt },
    snippets: project.snippets.map((snippet, i) => ({ ...snippet, ...at(t.snippets, i) })),
    gallery: project.gallery.map((cover, i) => ({ ...cover, alt: at(t.galleryAlt, i) ?? cover.alt })),
  }
}

/** Order is kept as written in content/projects.ts. */
export function getProjects(locale: Locale): Project[] {
  return projectsEn.map((project) => localizeProject(project, locale))
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  const project = projectsEn.find((p) => p.slug === slug)
  return project ? localizeProject(project, locale) : undefined
}

/** The next project in the list, wrapping around to the first. */
export function getNextProject(locale: Locale, slug: string): Project {
  const i = projectsEn.findIndex((p) => p.slug === slug)
  return localizeProject(projectsEn[(i + 1) % projectsEn.length], locale)
}

export function projectSlugs(): string[] {
  return projectsEn.map((project) => project.slug)
}

/* ------------------------------ posts ------------------------------ */

function localizePost(post: Post, locale: Locale): Post {
  if (locale !== "ur") return post
  const t = postsUr[post.slug]
  if (!t) return post
  return {
    ...post,
    title: t.title,
    excerpt: t.excerpt,
    body: t.body,
    quote: t.quote,
    cover: { ...post.cover, alt: t.coverAlt },
  }
}

/** Newest first, in either language (the order comes from the dates in the English file). */
const postsByDate: Post[] = [...postsEn].sort((a, b) => b.date.localeCompare(a.date))

export function getPosts(locale: Locale): Post[] {
  return postsByDate.map((post) => localizePost(post, locale))
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  const post = postsByDate.find((p) => p.slug === slug)
  return post ? localizePost(post, locale) : undefined
}

/** The next post in the list, wrapping around to the first. */
export function getNextPost(locale: Locale, slug: string): Post {
  const i = postsByDate.findIndex((p) => p.slug === slug)
  return localizePost(postsByDate[(i + 1) % postsByDate.length], locale)
}

export function latestPosts(locale: Locale, count = 3): Post[] {
  return getPosts(locale).slice(0, count)
}

export function postSlugs(): string[] {
  return postsByDate.map((post) => post.slug)
}

/* ------------------------------ lists ------------------------------ */

export function getServices(locale: Locale): Service[] {
  if (locale !== "ur") return servicesEn
  return servicesEn.map((service, i) => ({
    ...service,
    ...at(servicesUr, i),
    index: digits(service.index, locale),
  }))
}

export function getExperience(locale: Locale): Role[] {
  if (locale !== "ur") return experienceEn
  return experienceEn.map((role, i) => ({
    ...role,
    ...at(experienceUr, i),
    index: digits(role.index, locale),
    years: digits(role.years, locale),
  }))
}

export function getSkills(locale: Locale): SkillGroup[] {
  if (locale !== "ur") return skillsEn
  return skillsEn.map((group, i) => ({ ...group, name: at(skillsUr, i)?.name ?? group.name }))
}

export function getCertificates(locale: Locale): Certificate[] {
  if (locale !== "ur") return certificatesEn
  return certificatesEn.map((certificate, i) => ({
    ...certificate,
    ...at(certificatesUr, i),
    year: digits(certificate.year, locale),
  }))
}

export function getTestimonials(locale: Locale): Testimonial[] {
  if (locale !== "ur") return testimonialsEn
  return testimonialsEn.map((testimonial, i) => ({ ...testimonial, ...at(testimonialsUr, i) }))
}
