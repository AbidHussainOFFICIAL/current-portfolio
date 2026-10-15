import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CaseContent } from "@/components/case/case-content"
import { CaseHero } from "@/components/case/case-hero"
import { NextUp } from "@/components/ui/next-up"
import { allProjects, getNextProject, getProject } from "@/lib/content"

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return allProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article", url: `/work/${slug}`, title: project.title, description: project.intro },
    twitter: { title: project.title, description: project.intro },
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(slug)

  return (
    <main id="main">
      <CaseHero project={project} />
      <CaseContent project={project} />
      <NextUp label="Next project" title={next.title} href={`/work/${next.slug}`} />
    </main>
  )
}
