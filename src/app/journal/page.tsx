import type { Metadata } from "next"

import { ArticleCard } from "@/components/journal/article-card"
import { MaskLine } from "@/components/ui/mask-line"
import { Reveal } from "@/components/ui/reveal"
import { allArticles } from "@/lib/content"
import { pad2 } from "@/lib/format"

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on design, engineering, performance and working as a freelancer.",
  alternates: { canonical: "/journal" },
  openGraph: { url: "/journal", title: "Journal" },
}

export default function JournalPage() {
  const [lead, ...rest] = allArticles

  return (
    <main id="main" className="gutter container-page pt-32 pb-24 md:pt-44 md:pb-40">
      <header className="mb-14 md:mb-24">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="label text-muted">Journal</p>
          <p className="label text-faint">{pad2(allArticles.length)} articles</p>
        </div>
        <h1 className="mt-10 font-display text-section uppercase">
          <MaskLine immediate>Journal</MaskLine>
        </h1>
        <p className="mt-8 max-w-xl text-lead text-muted">
          Notes on design, engineering, performance and working as a freelancer.
        </p>
      </header>

      <Reveal>
        <ArticleCard article={lead} sizes="100vw" large />
      </Reveal>

      <ul className="mt-20 grid gap-x-8 gap-y-16 md:mt-32 md:grid-cols-2">
        {rest.map((article, index) => (
          <li key={article.slug}>
            <Reveal delay={(index % 2) * 0.1}>
              <ArticleCard article={article} sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
