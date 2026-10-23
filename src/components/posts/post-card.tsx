import { ArrowRight } from "lucide-react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/content"

interface PostCardProps {
  post: Post
  locale: Locale
  sizes: string
}

/** Kern Journal card: picture with a platform tag, date, title and a "Read post" link. */
export function PostCard({ post, locale, sizes }: PostCardProps) {
  const dict = getDictionary(locale)

  return (
    <TransitionLink href={`/posts/${post.slug}`} className="group block" data-cursor={dict.cursor.read}>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-110">
          <CoverImage cover={post.cover} sizes={sizes} />
        </div>
        <span className="tag absolute start-4 top-4 bg-page/80 text-fg backdrop-blur-sm">{post.platform}</span>
      </div>
      <p className="label mt-5 text-accent-small">{formatDate(post.date, locale)}</p>
      <h3 className="mt-2 font-display text-xl leading-snug font-bold tracking-tight transition-colors duration-300 group-hover:text-muted md:text-2xl">
        {post.title}
      </h3>
      <span className="label link-sweep mt-3 inline-flex items-center gap-2 pb-1 text-muted">
        {dict.common.readPost}
        <ArrowRight className="mirror size-4" aria-hidden />
      </span>
    </TransitionLink>
  )
}
