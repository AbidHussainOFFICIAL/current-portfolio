import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/cn"
import { pad2 } from "@/lib/format"
import type { Project } from "@/types/content"

export function CaseContent({ project }: { project: Project }) {
  return (
    <div className="pt-20 md:pt-32">
      <div className="gutter container-page">
        <Reveal>
          <p className="label mb-8 text-accent">( Overview )</p>
          <p className="max-w-5xl font-display text-statement">{project.summary}</p>
        </Reveal>
      </div>

      <section aria-label="What I built" className="mt-20 md:mt-32">
        <div className="gutter container-page">
          <p className="label mb-8 text-accent">( What I built )</p>
        </div>
        <ol className="border-t border-line">
          {project.highlights.map((highlight, index) => (
            <li key={highlight} className="border-b border-line">
              <Reveal>
                <div className="gutter container-page grid items-baseline gap-3 py-6 md:grid-cols-[4rem_1fr] md:gap-8 md:py-8">
                  <span className="label text-faint">({pad2(index + 1)})</span>
                  <p className="max-w-3xl text-xl font-medium md:text-2xl">{highlight}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <ul className="gutter container-page mt-20 grid gap-6 pb-20 md:mt-32 md:grid-cols-2 md:gap-8 md:pb-32">
        {project.gallery.map((item, index) => (
          <li key={`${item.caption}-${index}`} className={cn(index === 0 && "md:col-span-2")}>
            <ClipReveal
              className={cn(
                "relative overflow-hidden bg-surface",
                index === 0 ? "aspect-[16/9]" : "aspect-[4/3]",
              )}
            >
              <CoverImage
                cover={item.cover}
                sizes={index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                label={item.caption}
              />
            </ClipReveal>
            <p className="label mt-3 text-faint">{item.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
