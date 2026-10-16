import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { experience } from "@/content/experience"

/** Rows fill with paper from the bottom on hover (Kern Services style). */
export function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading title="Experience" label="2023 — 2026" />
      </div>

      <ul className="border-t border-line">
        {experience.map((role, index) => (
          <li key={role.index} className="border-b border-line">
            <Reveal delay={index * 0.08}>
              <div className="group relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-in-out-expo group-hover:scale-y-100"
                />
                <div className="gutter container-page relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-ink md:grid-cols-[4rem_1fr_1.2fr] md:items-center md:gap-8 md:py-12">
                  <span className="label text-faint transition-colors duration-500 group-hover:text-ink/60">
                    ({role.index})
                  </span>

                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight uppercase md:text-5xl">
                      {role.title}
                    </h3>
                    <p className="label mt-3 text-muted transition-colors duration-500 group-hover:text-ink/70">
                      {role.organisation} · {role.years}
                    </p>
                  </div>

                  <div>
                    <p className="max-w-xl text-muted transition-colors duration-500 group-hover:text-ink/80">
                      {role.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <li
                          key={tag}
                          className="tag transition-colors duration-500 group-hover:border-ink/25 group-hover:text-ink/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
