import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/content"

interface PostCardProps {
  post: Post
  sizes: string
}

/** Kern Journal card: picture with a platform tag, date, title and a "Read post" link. */
export function PostCard({ post, sizes }: PostCardProps) {
  return (
    <TransitionLink href={`/posts/${post.slug}`} className="group block" data-cursor="Read">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-110">
          <CoverImage cover={post.cover} sizes={sizes} label={post.platform} />
        </div>
        <span className="tag absolute top-4 left-4 bg-ink/80 text-paper backdrop-blur-sm">{post.platform}</span>
      </div>
      <p className="label mt-5 text-accent">{formatDate(post.date)}</p>
      <h3 className="mt-2 font-display text-xl leading-snug font-bold tracking-tight transition-colors duration-300 group-hover:text-paper/70 md:text-2xl">
        {post.title}
      </h3>
      <span className="label link-sweep mt-3 inline-block pb-1 text-muted">Read post →</span>
    </TransitionLink>
  )
}
