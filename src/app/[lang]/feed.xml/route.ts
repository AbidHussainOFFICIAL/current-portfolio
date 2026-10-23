import { isLocale } from "@/i18n/config"
import { buildFeed } from "@/lib/feed"

export const dynamic = "force-static"

// English is served at /feed.xml, so only the other languages live under a prefix.
export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: "ur" }]
}

/** RSS feed of the posts in one language: /ur/feed.xml (English is served at /feed.xml). */
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return new Response("Not found", { status: 404 })
  return buildFeed(lang)
}
