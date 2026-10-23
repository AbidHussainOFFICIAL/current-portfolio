import { ArrowRight } from "lucide-react"

import { PalettePreview } from "@/components/ui/palette-preview"
import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { digits } from "@/lib/format"
import type { Palette, Project } from "@/types/content"

interface NextProjectProps {
  project: Project
  locale: Locale
  /** Palette of the page this block sits on. */
  current: Palette
}

/**
 * Full-bleed link to the next project (Noir): its picture behind a 60% black scrim, with a huge title.
 * While the block is on screen the page previews the next project's palette (the arrow disc below).
 */
export function NextProject({ project, locale, current }: NextProjectProps) {
  const dict = getDictionary(locale)

  return (
    <PalettePreview preview={project.palette} current={current}>
      <TransitionLink
        href={`/work/${project.slug}`}
        data-cursor={dict.cursor.next}
        className="group relative block h-svh min-h-[28rem] overflow-hidden bg-page"
      >
        {/* Only transform and opacity animate, so the zoom and the brightening stay smooth. */}
        <div className="absolute inset-0 scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.06]">
          <CoverImage cover={project.cover} sizes="100vw" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-black opacity-60 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-40"
        />

        {/* Text over a picture is always white. */}
        <div className="relative z-(--z-raised) flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <span className="label">{dict.case.nextProject}</span>
          <span className="mt-6 block max-w-[8em] font-display text-section uppercase">{project.title}</span>
          <span className="label mt-8">
            {project.category} — {digits(project.year, locale)}
          </span>
          <span className="mt-8 grid size-14 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:scale-110">
            <ArrowRight className="mirror size-6" aria-hidden />
          </span>
        </div>
      </TransitionLink>
    </PalettePreview>
  )
}
