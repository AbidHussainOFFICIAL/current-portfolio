import { ClipReveal } from "@/components/ui/clip-reveal"
import { CoverImage } from "@/components/ui/cover-image"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/cn"
import type { Project } from "@/types/content"

export function CaseContent({ project }: { project: Project }) {
  const sections = [
    { label: "The challenge", text: project.challenge },
    { label: "The approach", text: project.approach },
    { label: "The result", text: project.result },
  ]

  return (
    <div className="gutter container-page pt-24 pb-24 md:pt-40 md:pb-40">
      <div className="flex flex-col gap-16 md:gap-24">
        {sections.map((section) => (
          <Reveal key={section.label}>
            <section className="grid gap-4 border-t border-line pt-8 md:grid-cols-12 md:gap-10">
              <h2 className="label text-accent md:col-span-3">{section.label}</h2>
              <p className="font-display text-statement md:col-span-9">{section.text}</p>
            </section>
          </Reveal>
        ))}
      </div>

      {project.metrics ? (
        <Reveal>
          <dl className="mt-24 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 md:mt-40 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="label order-2 mt-3 text-muted">{metric.label}</dt>
                <dd className="font-display text-numeral">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}

      <ul className="mt-24 grid gap-6 md:mt-40 md:grid-cols-2 md:gap-8">
        {project.gallery.map((item, index) => (
          <li key={`${item.cover.alt}-${index}`} className={cn(index === 0 && "md:col-span-2")}>
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
            {item.caption ? <p className="label mt-3 text-faint">{item.caption}</p> : null}
          </li>
        ))}
      </ul>

      {project.quote ? (
        <Reveal>
          <figure className="mt-24 border-t border-line pt-12 md:mt-40">
            <blockquote className="max-w-5xl font-display text-statement">
              &ldquo;{project.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-display text-lg font-bold">{project.quote.author}</p>
              <p className="label mt-1 text-muted">{project.quote.role}</p>
            </figcaption>
          </figure>
        </Reveal>
      ) : null}
    </div>
  )
}
