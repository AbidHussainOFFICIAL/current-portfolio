import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CoverImage } from "@/components/ui/cover-image"
import { Reveal } from "@/components/ui/reveal"
import { TransitionLink } from "@/components/ui/transition-link"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPosts } from "@/lib/content"
import { fmt, formatDate, pad2 } from "@/lib/format"
import { pageMetadata } from "@/lib/seo"

type Params = { lang: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  return pageMetadata({
    locale: lang,
    path: "/posts",
    title: dict.posts.pageTitle,
    description: dict.posts.pageDescription,
  })
}

export default async function PostsPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const posts = getPosts(lang)

  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <header className="gutter container-page mb-14 flex items-end justify-between gap-6">
        <h1 className="font-display text-heading uppercase">{dict.posts.pageTitle}</h1>
        <p className="label pb-2 text-muted md:pb-3">
          {fmt(dict.common.postsCount, { n: pad2(posts.length, lang) }, lang)}
        </p>
      </header>

      <ul className="border-t border-line">
        {posts.map((post, index) => (
          <li key={post.slug} className="border-b border-line">
            <Reveal delay={index * 0.06}>
              <TransitionLink
                href={`/posts/${post.slug}`}
                data-cursor={dict.cursor.read}
                className="group gutter container-page grid items-center gap-6 py-8 md:grid-cols-[220px_1fr_auto] md:gap-12 md:py-12"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-surface md:aspect-[4/3]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
                    <CoverImage cover={post.cover} sizes="(min-width: 768px) 220px, 100vw" />
                  </div>
                </div>

                <div>
                  <p className="label flex items-center gap-4">
                    <span className="text-accent-small">{post.platform}</span>
                    <span className="text-faint">{formatDate(post.date, lang)}</span>
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:nudge-3 md:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-sm text-small text-muted">{post.excerpt}</p>
                </div>

                <ArrowRight
                  aria-hidden
                  className="mirror hidden size-9 text-faint transition-all duration-500 group-hover:nudge-2 group-hover:text-accent-small md:block"
                />
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
