import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { MaskLine } from "@/components/ui/mask-line"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

export function CaseHero({ project }: { project: Project }) {
  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Year", value: String(project.year) },
  ]

  return (
    <header className="gutter container-page pt-32 md:pt-44">
      <TransitionLink
        href="/work"
        className="label link-sweep inline-flex items-center gap-2 pb-1 text-muted hover:text-paper"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All work
      </TransitionLink>

      <p className="label mt-12 text-accent">{project.category}</p>
      <h1 className="mt-4 font-display text-section uppercase">
        <MaskLine immediate>{project.title}</MaskLine>
      </h1>
      <p className="mt-8 max-w-2xl text-lead text-muted">{project.intro}</p>

      <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
        {meta.map((row) => (
          <div key={row.label}>
            <dt className="label text-faint">{row.label}</dt>
            <dd className="mt-2">{row.value}</dd>
          </div>
        ))}
        <div className="col-span-2">
          <dt className="label text-faint">Stack</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="label rounded-full border border-line px-3 py-1.5 text-muted">
                {tech}
              </span>
            ))}
          </dd>
        </div>
        {project.links ? (
          <div className="col-span-2">
            <dt className="label text-faint">Links</dt>
            <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-1.5 hover:text-accent"
                >
                  Live site
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-1.5 hover:text-accent"
                >
                  Source code
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </dd>
          </div>
        ) : null}
      </dl>

      <ClipReveal immediate delay={0.2} className="relative mt-14 aspect-[16/9] overflow-hidden bg-surface md:mt-20">
        <CoverImage cover={project.cover} sizes="100vw" priority label={project.title} />
      </ClipReveal>
    </header>
  )
}
