import type { MetadataRoute } from "next"

import { site } from "@/content/site"
import { allPosts, allProjects } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/work`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/posts`, lastModified: now, priority: 0.8 },
    ...allProjects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...allPosts.map((post) => ({
      url: `${site.url}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.6,
    })),
  ]
}
