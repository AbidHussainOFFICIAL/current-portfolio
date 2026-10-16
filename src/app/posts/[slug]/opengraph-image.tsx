import { getPost } from "@/lib/content"
import { renderOg } from "@/lib/og"

export const alt = "Social media post"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  return renderOg({
    eyebrow: post ? `Posts / ${post.platform}` : "Posts",
    title: post?.title ?? "Post",
  })
}
