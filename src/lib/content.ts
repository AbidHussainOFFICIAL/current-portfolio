import { articles as rawArticles } from "@/content/articles"
import { projects } from "@/content/projects"
import type { Article, Project } from "@/types/content"

/** Newest first. */
export const allArticles: Article[] = [...rawArticles].sort((a, b) => b.date.localeCompare(a.date))

/** Newest year first, order inside a year is kept as written. */
export const allProjects: Project[] = [...projects].sort((a, b) => b.year - a.year)

export const featuredProjects: Project[] = allProjects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}

/** The next project in the list, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const i = allProjects.findIndex((p) => p.slug === slug)
  return allProjects[(i + 1) % allProjects.length]
}

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug)
}

/** The next article in the list, wrapping around to the first. */
export function getNextArticle(slug: string): Article {
  const i = allArticles.findIndex((a) => a.slug === slug)
  return allArticles[(i + 1) % allArticles.length]
}

export function latestArticles(count = 3): Article[] {
  return allArticles.slice(0, count)
}
