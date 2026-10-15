import { getArticle } from "@/lib/content"
import { renderOg } from "@/lib/og"

export const alt = "Journal article"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)

  return renderOg({
    eyebrow: article ? `Journal / ${article.tag}` : "Journal",
    title: article?.title ?? "Article",
  })
}
