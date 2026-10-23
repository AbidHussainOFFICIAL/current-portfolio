import { getPost } from "@/lib/content"
import { renderOg } from "@/lib/og"

export const alt = "Social media post"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Share images are always English: the image renderer has no Urdu font, and one picture serves both languages. */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params
  const post = getPost("en", slug)

  return renderOg({
    eyebrow: post ? `Posts / ${post.platform}` : "Posts",
    title: post?.title ?? "Post",
  })
}
