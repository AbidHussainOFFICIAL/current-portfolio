import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { ParallaxFrame } from "@/components/case/parallax-frame"
import { ClipReveal } from "@/components/ui/clip-reveal"
import { MaskLine } from "@/components/ui/mask-line"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { digits } from "@/lib/format"
import type { Project } from "@/types/content"

/** The frame sits inside the page gutter, so the picture is a little narrower than the screen. */
const FRAME_SIZES = "(min-width: 1280px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 5rem), calc(100vw - 3rem)"

export function CaseHero({ project, locale }: { project: Project; locale: Locale }) {
  const dict = getDictionary(locale)
  const external = "group btn"
  const arrow =
    "mirror size-4 transition-transform duration-500 group-hover:nudge-ne"

  return (
    <header className="gutter container-page pt-32 md:pt-40">
      <TransitionLink
        href="/work"
        className="label link-sweep inline-flex min-h-11 items-center gap-2 pb-1 text-muted hover:text-fg"
      >
        <ArrowLeft className="mirror size-4" aria-hidden />
        {dict.case.allProjects}
      </TransitionLink>

      <p className="label mt-12 text-muted">
        {project.category} — {digits(project.year, locale)}
      </p>
      <h1 className="mt-4 font-display text-section uppercase">
        <MaskLine immediate>{project.title}</MaskLine>
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lead text-muted">{project.intro}</p>

        {/* A button shows only when its link exists: private repositories have no GitHub button. */}
        {project.links?.live || project.links?.repo ? (
          <div className="flex flex-wrap gap-3">
            {project.links.live ? (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={external}>
                {dict.case.liveSite}
                <ArrowUpRight className={arrow} aria-hidden />
                <span className="sr-only">{dict.common.opensInNewTab}</span>
              </a>
            ) : null}
            {project.links.repo ? (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={external}>
                {dict.case.githubRepository}
                <ArrowUpRight className={arrow} aria-hidden />
                <span className="sr-only">{dict.common.opensInNewTab}</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <ClipReveal immediate delay={0.2} className="mt-12 md:mt-16">
        <ParallaxFrame cover={project.cover} sizes={FRAME_SIZES} priority className="aspect-[4/3] md:aspect-[21/9]" />
      </ClipReveal>
    </header>
  )
}
