import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { NextUp } from "@/components/ui/next-up"
import { TransitionLink } from "@/components/ui/transition-link"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getNextPost, getPost, getSite, postSlugs } from "@/lib/content"
import { fmt, formatDate } from "@/lib/format"
import { pageMetadata } from "@/lib/seo"

type Params = { lang: string; slug: string }

export const dynamicParams = false

/** The languages come from the parent layout; this adds the post slugs. */
export function generateStaticParams(): { slug: string }[] {
  return postSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const post = getPost(lang, slug)
  if (!post) return {}

  return pageMetadata({
    locale: lang,
    path: `/posts/${slug}`,
    title: post.title,
    description: post.excerpt,
    article: { publishedTime: post.date },
  })
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const post = getPost(lang, slug)
  if (!post) notFound()

  const dict = getDictionary(lang)
  const site = getSite(lang)
  const next = getNextPost(lang, slug)
  const [first, ...rest] = post.body
  const body = "text-lg text-fg/85 md:text-xl"

  return (
    <main id="main" className="pt-32 md:pt-40">
      <article>
        <header className="gutter container-page">
          <TransitionLink
            href="/posts"
            className="label link-sweep inline-flex min-h-11 items-center gap-2 pb-1 text-muted hover:text-fg"
          >
            <ArrowLeft className="mirror size-4" aria-hidden />
            {dict.posts.back}
          </TransitionLink>

          <div className="mx-auto mt-10 max-w-lg">
            <p className="label flex items-center gap-4">
              <span className="text-accent-small">{post.platform}</span>
              <span className="text-faint">{formatDate(post.date, lang)}</span>
            </p>
            <h1 className="mt-6 font-display text-title">{post.title}</h1>
            <p className="mt-6 text-lg text-muted md:text-xl">{post.excerpt}</p>
          </div>
        </header>

        <ClipReveal immediate delay={0.2} className="relative mt-14 aspect-[16/9] w-full overflow-hidden bg-surface">
          <CoverImage cover={post.cover} sizes="100vw" priority />
        </ClipReveal>

        <div className="gutter mx-auto max-w-md py-20 md:py-28">
          {/* A drop cap is a Latin habit: Urdu letters join, so the first Urdu paragraph is set plainly. */}
          {lang === "ur" ? (
            <p className={body}>{first}</p>
          ) : (
            <p className={body}>
              <span className="float-left mt-1 me-4 font-display text-7xl leading-[0.8] font-extrabold text-accent-text md:text-8xl">
                {first.charAt(0)}
              </span>
              {first.slice(1)}
            </p>
          )}

          <blockquote className="my-14 border-s-2 border-accent-line ps-8 font-display text-2xl leading-snug font-bold tracking-tight md:text-4xl">
            &ldquo;{post.quote}&rdquo;
          </blockquote>

          {rest.map((paragraph) => (
            <p key={paragraph} className={`mt-6 ${body}`}>
              {paragraph}
            </p>
          ))}

          <a href={post.url} target="_blank" rel="noopener noreferrer" className="group btn mt-14">
            {fmt(dict.posts.openOriginal, { platform: post.platform }, lang)}
            <ArrowUpRight
              className="mirror size-4 transition-transform duration-500 group-hover:nudge-ne"
              aria-hidden
            />
            <span className="sr-only">{dict.common.opensInNewTab}</span>
          </a>

          <p className="label mt-14 flex items-center gap-6 border-t border-line pt-8 text-faint">
            <span>{fmt(dict.posts.postedBy, { name: site.name }, lang)}</span>
            <span aria-hidden className="size-1 rounded-full bg-accent-line" />
            <span>{formatDate(post.date, lang)}</span>
          </p>
        </div>
      </article>

      <NextUp label={dict.posts.nextPost} title={next.title} href={`/posts/${next.slug}`} />
    </main>
  )
}
