import { getProject } from "@/lib/content"
import { renderOg } from "@/lib/og"

export const alt = "Case study"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  return renderOg({
    eyebrow: project ? `${project.category} / ${project.year}` : "Case study",
    title: project?.title ?? "Project",
  })
}
