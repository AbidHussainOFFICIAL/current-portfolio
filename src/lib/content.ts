import { posts as rawPosts } from "@/content/posts"
import { projects } from "@/content/projects"
import type { Post, Project } from "@/types/content"

/** Newest first. */
export const allPosts: Post[] = [...rawPosts].sort((a, b) => b.date.localeCompare(a.date))

/** Order is kept as written in content/projects.ts. */
export const allProjects: Project[] = [...projects]

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}

/** The next project in the list, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const i = allProjects.findIndex((p) => p.slug === slug)
  return allProjects[(i + 1) % allProjects.length]
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug)
}

/** The next post in the list, wrapping around to the first. */
export function getNextPost(slug: string): Post {
  const i = allPosts.findIndex((p) => p.slug === slug)
  return allPosts[(i + 1) % allPosts.length]
}

export function latestPosts(count = 3): Post[] {
  return allPosts.slice(0, count)
}
