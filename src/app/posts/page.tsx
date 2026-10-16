import type { Metadata } from "next"

import { CoverImage } from "@/components/ui/cover-image"
import { Reveal } from "@/components/ui/reveal"
import { TransitionLink } from "@/components/ui/transition-link"
import { allPosts } from "@/lib/content"
import { formatDate, pad2 } from "@/lib/format"

export const metadata: Metadata = {
  title: "Posts",
  description: "Posts I have shared on social media about building for the web.",
  alternates: { canonical: "/posts" },
  openGraph: { url: "/posts", title: "Posts" },
}

export default function PostsPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <header className="gutter container-page mb-14 flex items-end justify-between gap-6">
        <h1 className="font-display text-6xl font-extrabold tracking-tighter uppercase md:text-8xl">Posts</h1>
        <p className="label pb-2 text-muted md:pb-3">{pad2(allPosts.length)} posts</p>
      </header>

      <ul className="border-t border-line">
        {allPosts.map((post, index) => (
          <li key={post.slug} className="border-b border-line">
            <Reveal delay={index * 0.06}>
              <TransitionLink
                href={`/posts/${post.slug}`}
                data-cursor="Read"
                className="group gutter container-page grid items-center gap-6 py-8 md:grid-cols-[220px_1fr_auto] md:gap-12 md:py-12"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-surface md:aspect-[4/3]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
                    <CoverImage cover={post.cover} sizes="(min-width: 768px) 220px, 100vw" />
                  </div>
                </div>

                <div>
                  <p className="label flex items-center gap-4">
                    <span className="text-accent">{post.platform}</span>
                    <span className="text-faint">{formatDate(post.date)}</span>
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-muted">{post.excerpt}</p>
                </div>

                <span
                  aria-hidden
                  className="hidden font-display text-4xl text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent md:block"
                >
                  →
                </span>
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
