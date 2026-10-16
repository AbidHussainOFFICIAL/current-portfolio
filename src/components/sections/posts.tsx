import { PostCard } from "@/components/posts/post-card"
import { Reveal } from "@/components/ui/reveal"
import { TransitionLink } from "@/components/ui/transition-link"
import { latestPosts } from "@/lib/content"

/** Latest social media posts, laid out like the Kern Journal section. */
export function Posts() {
  const posts = latestPosts(3)

  return (
    <section id="posts" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <div className="mb-14 flex items-end justify-between gap-6">
          <h2 className="font-display text-heading uppercase">Posts</h2>
          <TransitionLink
            href="/posts"
            className="label link-sweep hidden pb-1 text-muted hover:text-paper md:block"
          >
            All posts ↗
          </TransitionLink>
        </div>

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.12}>
                <PostCard post={post} sizes="(min-width: 768px) 33vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:hidden">
          <TransitionLink href="/posts" className="label link-sweep pb-1 text-muted">
            All posts ↗
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
