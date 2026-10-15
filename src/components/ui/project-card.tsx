import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

interface ProjectCardProps {
  project: Project
  sizes: string
  priority?: boolean
}

/** Cover image with title, category and year underneath. Links to the case study. */
export function ProjectCard({ project, sizes, priority }: ProjectCardProps) {
  return (
    <TransitionLink href={`/work/${project.slug}`} className="group block" data-cursor="View">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-105">
          <CoverImage cover={project.cover} sizes={sizes} priority={priority} label={project.title} />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="font-display text-row uppercase transition-colors duration-500 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="label shrink-0 text-muted">{project.year}</p>
      </div>
      <p className="label mt-2 text-faint">{project.category}</p>
    </TransitionLink>
  )
}
