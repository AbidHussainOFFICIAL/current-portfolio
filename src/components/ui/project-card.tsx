import { ArrowUpRight } from "lucide-react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { digits } from "@/lib/format"
import type { Project } from "@/types/content"

interface ProjectCardProps {
  project: Project
  locale: Locale
  /** Cursor label, e.g. "View". */
  cursorLabel: string
  sizes: string
  priority?: boolean
}

/** Tile for the All Works page: cover with a category tag, title and year underneath. */
export function ProjectCard({ project, locale, cursorLabel, sizes, priority }: ProjectCardProps) {
  return (
    <TransitionLink href={`/work/${project.slug}`} className="group block" data-cursor={cursorLabel}>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
          <CoverImage cover={project.cover} sizes={sizes} priority={priority} />
        </div>
        <span className="tag absolute start-4 top-4 bg-page/80 text-fg backdrop-blur-sm">{project.category}</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h2 className="font-display text-row uppercase transition-transform duration-500 ease-out-expo group-hover:nudge-3">
          {project.title}
        </h2>
        <p className="label flex shrink-0 items-center gap-2 text-muted">
          {digits(project.year, locale)}
          <ArrowUpRight className="mirror size-4 transition-colors group-hover:text-accent-small" aria-hidden />
        </p>
      </div>
    </TransitionLink>
  )
}
