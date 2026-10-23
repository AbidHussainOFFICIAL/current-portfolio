import { ArrowUpRight } from "lucide-react"

import { PostCard } from "@/components/posts/post-card"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { latestPosts } from "@/lib/content"

/** Latest social media posts, laid out like the Kern Journal section. */
export function Posts({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const posts = latestPosts(locale, 3)

  return (
    <section id="posts" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading
          title={dict.posts.title}
          meta={
            <TransitionLink
              href="/posts"
              className="link-sweep tap inline-flex items-center gap-2 pb-1 hover:text-fg"
            >
              {dict.common.allPosts}
              <ArrowUpRight className="mirror size-4" aria-hidden />
            </TransitionLink>
          }
        />

        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 0.12}>
                <PostCard post={post} locale={locale} sizes="(min-width: 768px) 33vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
