import { ArrowUpRight } from "lucide-react"

import { CodeBlock } from "@/components/case/code-block"
import { ParallaxFrame } from "@/components/case/parallax-frame"
import { ClipReveal } from "@/components/ui/clip-reveal"
import { Reveal } from "@/components/ui/reveal"
import { pad2 } from "@/lib/format"
import type { Project } from "@/types/content"

/** The wide frame sits inside the page gutter, so the picture is a little narrower than the screen. */
const FRAME_SIZES = "(min-width: 1280px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 5rem), calc(100vw - 3rem)"

interface CaseSectionProps {
  title: string
  /** Small text on the right of the title line. */
  meta: string
  children: React.ReactNode
}

/** A full-width block with its line edge to edge: one title on the left, a small meta on the right. */
function CaseSection({ title, meta, children }: CaseSectionProps) {
  return (
    <section aria-label={title} className="section-pad">
      <div className="gutter container-page">
        <header className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="font-display text-[length:clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
            {title}
          </h2>
          <p className="label shrink-0 pb-1 text-muted">{meta}</p>
        </header>
        {children}
      </div>
    </section>
  )
}

/** Numbered rows with a line under each one, running edge to edge. */
function Ledger({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="border-t border-line">
      {items.map((item, index) => (
        <li key={index} className="border-b border-line">
          <Reveal>
            <div className="gutter container-page grid items-baseline gap-3 py-6 md:grid-cols-[4rem_1fr] md:gap-8 md:py-8">
              <span className="label text-faint">{pad2(index + 1)}</span>
              {item}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export function CaseContent({ project }: { project: Project }) {
  const [wide, ...rest] = project.gallery
  const link = "link-sweep inline-flex items-center gap-1.5 pb-0.5 hover:text-accent"

  return (
    <div className="mt-20 md:mt-32">
      <CaseSection title="The brief" meta="01">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-display text-statement">{project.summary}</p>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line">
              <div className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="label text-muted">Role</dt>
                <dd className="text-right">{project.role}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="label text-muted">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="label text-muted">Type</dt>
                <dd className="text-right">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="label text-muted">Stack</dt>
                <dd className="flex flex-wrap justify-end gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              {project.links?.live ? (
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="label text-muted">Live</dt>
                  <dd>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={link}>
                      Visit site
                      <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              ) : null}
              {project.links?.repo ? (
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="label text-muted">Source</dt>
                  <dd>
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={link}>
                      GitHub
                      <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </CaseSection>

      <section aria-label="Features" className="section-pad">
        <div className="gutter container-page">
          <header className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="font-display text-[length:clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
              Features
            </h2>
            <p className="label shrink-0 pb-1 text-muted">{pad2(project.features.length)} items</p>
          </header>
        </div>
        <Ledger
          items={project.features.map((feature) => (
            <p key={feature} className="max-w-3xl text-xl font-medium md:text-2xl">
              {feature}
            </p>
          ))}
        />
      </section>

      <div className="gutter container-page grid gap-6 md:grid-cols-2 md:gap-8">
        <ClipReveal className="md:col-span-2">
          <ParallaxFrame cover={wide} sizes={FRAME_SIZES} className="aspect-[4/3] md:aspect-[21/9]" />
        </ClipReveal>
        {rest.map((cover, index) => (
          <ClipReveal key={cover.src} delay={index * 0.1}>
            <ParallaxFrame cover={cover} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
          </ClipReveal>
        ))}
      </div>

      <section aria-label="Tech decisions" className="section-pad">
        <div className="gutter container-page">
          <header className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="font-display text-[length:clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
              Tech decisions
            </h2>
            <p className="label shrink-0 pb-1 text-muted">{pad2(project.decisions.length)} choices</p>
          </header>
        </div>
        <Ledger
          items={project.decisions.map((decision) => (
            <div key={decision.title} className="grid gap-3 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{decision.title}</h3>
              <p className="max-w-xl text-muted">{decision.text}</p>
            </div>
          ))}
        />
      </section>

      {project.snippets.length > 0 ? (
        <CaseSection title="Code" meta={`${pad2(project.snippets.length)} ${project.snippets.length === 1 ? "file" : "files"}`}>
          <div className="flex flex-col gap-14 md:gap-20">
            {project.snippets.map((snippet) => (
              <div key={snippet.filename} className="grid gap-6 md:grid-cols-12 md:gap-10">
                <Reveal className="md:col-span-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{snippet.title}</h3>
                  <p className="mt-4 text-muted">{snippet.description}</p>
                </Reveal>
                <div className="min-w-0 md:col-span-8">
                  <CodeBlock snippet={snippet} />
                </div>
              </div>
            ))}
          </div>
        </CaseSection>
      ) : null}

      <section aria-label="What I learned" className="section-pad">
        <div className="gutter container-page">
          <header className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="font-display text-[length:clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
              What I learned
            </h2>
            <p className="label shrink-0 pb-1 text-muted">{pad2(project.learned.length)} notes</p>
          </header>
        </div>
        <Ledger
          items={project.learned.map((note) => (
            <p key={note} className="max-w-3xl text-xl font-medium md:text-2xl">
              {note}
            </p>
          ))}
        />
      </section>
    </div>
  )
}
