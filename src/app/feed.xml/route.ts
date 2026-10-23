import { buildFeed } from "@/lib/feed"

export const dynamic = "force-static"

/** RSS feed of the posts in English, at the clean address /feed.xml. The Urdu feed is /ur/feed.xml. */
export function GET() {
  return buildFeed("en")
}
