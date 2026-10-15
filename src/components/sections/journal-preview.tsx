import { ArticleCard } from "@/components/journal/article-card"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { latestArticles } from "@/lib/content"

export function JournalPreview() {
  const articles = latestArticles(3)

  return (
    <section id="journal" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading index="06" label="Journal" title="Journal" />

        <ul className="grid gap-14 md:grid-cols-3 md:gap-8">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <Reveal delay={index * 0.1}>
                <ArticleCard article={article} sizes="(min-width: 768px) 33vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-end">
          <ArrowLink href="/journal">All articles</ArrowLink>
        </div>
      </div>
    </section>
  )
}
