import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectCard } from "@/components/ui/project-card"
import { Reveal } from "@/components/ui/reveal"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getProjects } from "@/lib/content"
import { fmt, pad2 } from "@/lib/format"
import { pageMetadata } from "@/lib/seo"

type Params = { lang: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  return pageMetadata({
    locale: lang,
    path: "/work",
    title: dict.work.pageTitle,
    description: dict.work.pageDescription,
  })
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const projects = getProjects(lang)

  return (
    <main id="main" className="gutter container-page pt-32 pb-24 md:pt-40 md:pb-32">
      <header className="mb-14 flex items-end justify-between gap-6">
        <h1 className="font-display text-heading uppercase">{dict.work.pageTitle}</h1>
        <p className="label pb-2 text-muted md:pb-3">
          {fmt(dict.common.projectsCount, { n: pad2(projects.length, lang) }, lang)}
        </p>
      </header>

      <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug} className={index % 2 === 1 ? "md:mt-24" : undefined}>
            <Reveal delay={(index % 2) * 0.1}>
              <ProjectCard
                project={project}
                locale={lang}
                cursorLabel={dict.cursor.view}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={index < 2}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
