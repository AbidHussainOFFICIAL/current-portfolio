import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { NextUp } from "@/components/ui/next-up"
import { TransitionLink } from "@/components/ui/transition-link"
import { site } from "@/content/site"
import { allPosts, getNextPost, getPost } from "@/lib/content"
import { formatDate } from "@/lib/format"

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${slug}` },
    openGraph: {
      type: "article",
      url: `/posts/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.name],
    },
    twitter: { title: post.title, description: post.excerpt },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const next = getNextPost(slug)
  const [first, ...rest] = post.body

  return (
    <main id="main" className="pt-32 md:pt-40">
      <article>
        <header className="gutter container-page">
          <TransitionLink
            href="/posts"
            className="label link-sweep inline-flex items-center gap-2 pb-1 text-muted hover:text-paper"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Posts
          </TransitionLink>

          <div className="mx-auto mt-10 max-w-4xl">
            <p className="label flex items-center gap-4">
              <span className="text-accent">{post.platform}</span>
              <span className="text-faint">{formatDate(post.date)}</span>
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-muted md:text-xl">{post.excerpt}</p>
          </div>
        </header>

        <ClipReveal immediate delay={0.2} className="relative mt-14 aspect-[16/9] w-full overflow-hidden bg-surface">
          <CoverImage cover={post.cover} sizes="100vw" priority label={post.platform} />
        </ClipReveal>

        <div className="gutter mx-auto max-w-3xl py-20 md:py-28">
          <p className="text-lg text-paper/85 md:text-xl">
            <span className="float-left mt-1 mr-4 font-display text-7xl leading-[0.8] font-extrabold text-accent md:text-8xl">
              {first.charAt(0)}
            </span>
            {first.slice(1)}
          </p>

          <blockquote className="my-14 border-l-2 border-accent pl-8 font-display text-2xl leading-snug font-bold tracking-tight md:text-4xl">
            &ldquo;{post.quote}&rdquo;
          </blockquote>

          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-lg text-paper/85 md:text-xl">
              {paragraph}
            </p>
          ))}

          <a href={post.url} target="_blank" rel="noopener noreferrer" className="group btn mt-14">
            Open the original post on {post.platform}
            <ArrowUpRight
              className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          <p className="label mt-14 flex items-center gap-6 border-t border-line pt-8 text-faint">
            <span>Posted by {site.name}</span>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>{formatDate(post.date)}</span>
          </p>
        </div>
      </article>

      <NextUp label="Next post" title={next.title} href={`/posts/${next.slug}`} />
    </main>
  )
}
