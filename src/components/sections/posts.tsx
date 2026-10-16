import { PostCard } from "@/components/posts/post-card"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { TransitionLink } from "@/components/ui/transition-link"
import { latestPosts } from "@/lib/content"

/** Latest social media posts, laid out like the Kern Journal section. */
export function Posts() {
  const posts = latestPosts(3)

  return (
    <section id="posts" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading
          title="Posts"
          meta={
            <TransitionLink href="/posts" className="link-sweep pb-1 hover:text-paper">
              All posts ↗
            </TransitionLink>
          }
        />

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.12}>
                <PostCard post={post} sizes="(min-width: 768px) 33vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
