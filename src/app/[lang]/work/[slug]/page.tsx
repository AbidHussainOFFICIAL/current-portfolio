import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CaseContent } from "@/components/case/case-content"
import { CaseHero } from "@/components/case/case-hero"
import { NextProject } from "@/components/case/next-project"
import { PaletteScope } from "@/components/ui/palette-scope"
import { isLocale } from "@/i18n/config"
import { getNextProject, getProject, projectSlugs } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

type Params = { lang: string; slug: string }

export const dynamicParams = false

/** The languages come from the parent layout; this adds the project slugs. */
export function generateStaticParams(): { slug: string }[] {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const project = getProject(lang, slug)
  if (!project) return {}

  return pageMetadata({
    locale: lang,
    path: `/work/${slug}`,
    title: project.title,
    description: project.intro,
  })
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const project = getProject(lang, slug)
  if (!project) notFound()

  const next = getNextProject(lang, slug)

  return (
    <main id="main">
      <PaletteScope palette={project.palette} />
      <CaseHero project={project} locale={lang} />
      <CaseContent project={project} locale={lang} />
      <NextProject project={next} locale={lang} current={project.palette} />
    </main>
  )
}
