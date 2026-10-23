import type { Metadata } from "next"

import { localePath, locales, ogLocale, type Locale } from "@/i18n/config"
import { getSite } from "@/lib/content"

interface PageMetadataInput {
  locale: Locale
  /** Language-free path, e.g. "/work/zivora". */
  path: string
  title: string
  description: string
  /** Extra Open Graph fields for articles. */
  article?: { publishedTime: string }
}

/** Canonical address, the other language (hreflang) and the social tags of one page. */
export function pageMetadata({ locale, path, title, description, article }: PageMetadataInput): Metadata {
  const site = getSite(locale)
  const languages: Record<string, string> = {}
  for (const code of locales) languages[code] = localePath(code, path)
  languages["x-default"] = localePath("en", path)

  return {
    title,
    description,
    alternates: { canonical: localePath(locale, path), languages },
    openGraph: {
      type: article ? "article" : "website",
      url: localePath(locale, path),
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => ogLocale[code]),
      ...(article ? { publishedTime: article.publishedTime, authors: [site.name] } : {}),
    },
    twitter: { title, description },
  }
}
