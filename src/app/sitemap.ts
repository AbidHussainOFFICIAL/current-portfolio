import type { MetadataRoute } from "next"

import { site } from "@/content/site"
import { localePath, locales } from "@/i18n/config"
import { getPosts, getProjects } from "@/lib/content"

/** One entry per page and language, each pointing at its twin in the other language (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (locale: (typeof locales)[number], path: string) => `${site.url}${localePath(locale, path)}`

  function entry(path: string, lastModified: Date, priority: number): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(locales.map((locale) => [locale, url(locale, path)]))
    return locales.map((locale) => ({
      url: url(locale, path),
      lastModified,
      priority,
      alternates: { languages },
    }))
  }

  return [
    ...entry("/", now, 1),
    ...entry("/work", now, 0.9),
    ...entry("/posts", now, 0.8),
    ...getProjects("en").flatMap((project) => entry(`/work/${project.slug}`, now, 0.7)),
    ...getPosts("en").flatMap((post) => entry(`/posts/${post.slug}`, new Date(post.date), 0.6)),
  ]
}
