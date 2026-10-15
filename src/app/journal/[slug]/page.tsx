import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { MaskLine } from "@/components/ui/mask-line"
import { NextUp } from "@/components/ui/next-up"
import { TransitionLink } from "@/components/ui/transition-link"
import { site } from "@/content/site"
import { allArticles, getArticle, getNextArticle } from "@/lib/content"
import { formatDate } from "@/lib/format"
import { ArrowLeft } from "lucide-react"

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return allArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: "article",
      url: `/journal/${slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [site.name],
      tags: [article.tag],
    },
    twitter: { title: article.title, description: article.excerpt },
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const { default: Post } = await import(`@/content/articles/${slug}.mdx`)
  const next = getNextArticle(slug)

  return (
    <main id="main">
      <article>
        <header className="gutter container-page pt-32 md:pt-44">
          <TransitionLink
            href="/journal"
            className="label link-sweep inline-flex items-center gap-2 pb-1 text-muted hover:text-paper"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Journal
          </TransitionLink>

          <div className="mx-auto mt-12 max-w-4xl">
            <p className="label flex flex-wrap items-center gap-4">
              <span className="text-accent">{article.tag}</span>
              <span className="text-faint">{formatDate(article.date)}</span>
              <span className="text-faint">{article.readingTime} read</span>
            </p>
            <h1 className="mt-6 font-display text-statement font-bold">
              <MaskLine immediate>{article.title}</MaskLine>
            </h1>
            <p className="mt-6 text-lead text-muted">{article.excerpt}</p>
          </div>

          <ClipReveal
            immediate
            delay={0.2}
            className="relative mt-14 aspect-[16/9] overflow-hidden bg-surface md:mt-20"
          >
            <CoverImage cover={article.cover} sizes="100vw" priority label={article.tag} />
          </ClipReveal>
        </header>

        <div className="gutter py-20 md:py-28">
          <div className="prose-journal mx-auto max-w-3xl">
            <Post />
          </div>

          <p className="label mx-auto mt-16 flex max-w-3xl items-center gap-4 border-t border-line pt-8 text-faint">
            <span>Written by {site.name}</span>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>{formatDate(article.date)}</span>
          </p>
        </div>
      </article>

      <NextUp label="Next article" title={next.title} href={`/journal/${next.slug}`} />
    </main>
  )
}
