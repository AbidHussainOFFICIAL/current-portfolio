import { ArrowUpRight } from "lucide-react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

interface ProjectCardProps {
  project: Project
  sizes: string
  priority?: boolean
}

/** Tile for the All Works page: cover with a category tag, title and year underneath. */
export function ProjectCard({ project, sizes, priority }: ProjectCardProps) {
  return (
    <TransitionLink href={`/work/${project.slug}`} className="group block" data-cursor="View">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
          <CoverImage cover={project.cover} sizes={sizes} priority={priority} />
        </div>
        <span className="tag absolute top-4 left-4 bg-ink/80 text-paper backdrop-blur-sm">{project.category}</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h2 className="font-display text-2xl font-bold tracking-tight uppercase transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-4xl">
          {project.title}
        </h2>
        <p className="label flex shrink-0 items-center gap-2 text-muted">
          {project.year}
          <ArrowUpRight className="size-4 transition-colors group-hover:text-accent" aria-hidden />
        </p>
      </div>
    </TransitionLink>
  )
}
