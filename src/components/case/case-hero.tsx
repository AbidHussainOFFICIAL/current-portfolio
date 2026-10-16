import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { MaskLine } from "@/components/ui/mask-line"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

const externalLink =
  "label link-sweep inline-flex items-center gap-1.5 pb-1 text-paper hover:text-accent"

export function CaseHero({ project }: { project: Project }) {
  return (
    <header className="gutter container-page pt-32 md:pt-40">
      <TransitionLink
        href="/work"
        className="label link-sweep inline-flex items-center gap-2 pb-1 text-muted hover:text-paper"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All projects
      </TransitionLink>

      <p className="label mt-12 text-accent">( {project.category} )</p>
      <h1 className="mt-4 font-display text-[length:clamp(3rem,9vw,8rem)] leading-[0.9] font-extrabold tracking-tighter uppercase">
        <MaskLine immediate>{project.title}</MaskLine>
      </h1>
      <p className="mt-8 max-w-2xl text-lead text-muted">{project.intro}</p>

      <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
        <div>
          <dt className="label text-faint">Role</dt>
          <dd className="mt-2">{project.role}</dd>
        </div>
        <div>
          <dt className="label text-faint">Year</dt>
          <dd className="mt-2">{project.year}</dd>
        </div>
        <div className="col-span-2">
          <dt className="label text-faint">Stack</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </dd>
        </div>
        {project.links ? (
          <div className="col-span-2 md:col-span-4">
            <dt className="label text-faint">Links</dt>
            <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {project.links.live ? (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={externalLink}>
                  Live site
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
              {project.links.repo ? (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={externalLink}>
                  Source code
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </dd>
          </div>
        ) : null}
      </dl>

      <ClipReveal immediate delay={0.2} className="relative mt-12 aspect-[16/9] overflow-hidden bg-surface md:mt-16">
        <CoverImage cover={project.cover} sizes="100vw" priority label={project.title} />
      </ClipReveal>
    </header>
  )
}
