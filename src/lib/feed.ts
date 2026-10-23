import { getDictionary } from "@/i18n/dictionaries"
import { htmlLang, localePath, type Locale } from "@/i18n/config"
import { getPosts, getSite } from "@/lib/content"
import { fmt } from "@/lib/format"
import { site as base } from "@/content/site"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** RSS 2.0 feed of the posts in one language. */
export function buildFeed(locale: Locale): Response {
  const site = getSite(locale)
  const dict = getDictionary(locale)
  const origin = base.url

  const items = getPosts(locale)
    .map((post) => {
      const url = `${origin}${localePath(locale, `/posts/${post.slug}`)}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.platform)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    })
    .join("\n")

  const feedUrl = `${origin}${locale === "en" ? "" : `/${locale}`}/feed.xml`

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(fmt(dict.posts.feedTitle, { name: site.name }, locale))}</title>
    <link>${origin}${localePath(locale, "/posts")}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${htmlLang[locale]}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
