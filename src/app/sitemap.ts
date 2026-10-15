import type { MetadataRoute } from "next"

import { site } from "@/content/site"
import { allArticles, allProjects } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/work`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/journal`, lastModified: now, priority: 0.8 },
    ...allProjects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...allArticles.map((article) => ({
      url: `${site.url}/journal/${article.slug}`,
      lastModified: new Date(article.date),
      priority: 0.6,
    })),
  ]
}
