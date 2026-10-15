import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { formatDate } from "@/lib/format"
import type { Article } from "@/types/content"

interface ArticleCardProps {
  article: Article
  sizes: string
  /** Larger title and wider image for the lead article. */
  large?: boolean
}

export function ArticleCard({ article, sizes, large = false }: ArticleCardProps) {
  return (
    <TransitionLink href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
      <div
        className={`relative overflow-hidden bg-surface ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-105">
          <CoverImage cover={article.cover} sizes={sizes} label={article.tag} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="label text-accent">{article.tag}</span>
        <span className="label text-faint">{formatDate(article.date)}</span>
        <span className="label text-faint">{article.readingTime}</span>
      </div>

      <h3
        className={`mt-4 font-display font-bold tracking-tight transition-colors duration-500 group-hover:text-accent ${
          large ? "text-row" : "text-2xl md:text-3xl"
        }`}
      >
        {article.title}
      </h3>
      <p className="mt-3 max-w-2xl text-muted">{article.excerpt}</p>
    </TransitionLink>
  )
}
