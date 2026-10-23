import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getExperience } from "@/lib/content"

/** Rows fill with the text colour from the bottom on hover (Kern Services style). */
export function Experience({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const experience = getExperience(locale)

  return (
    <section id="experience" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading title={dict.experience.title} meta={dict.experience.range} />
      </div>

      <ul className="border-t border-line">
        {experience.map((role, index) => (
          <li key={role.title} className="border-b border-line">
            <Reveal delay={index * 0.08}>
              <div className="group relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-in-out-expo group-hover:scale-y-100"
                />
                <div className="gutter container-page relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-page md:grid-cols-[4rem_1fr_1.2fr] md:items-center md:gap-8 md:py-12">
                  <span className="label text-faint transition-colors duration-500 group-hover:text-page/70">
                    ({role.index})
                  </span>

                  <div>
                    <h3 className="font-display text-row uppercase">{role.title}</h3>
                    <p className="label mt-3 text-muted transition-colors duration-500 group-hover:text-page/80">
                      <bdi>{role.organisation}</bdi> · <bdi>{role.years}</bdi>
                    </p>
                  </div>

                  <div>
                    <p className="max-w-sm text-muted transition-colors duration-500 group-hover:text-page/80">
                      {role.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <li
                          key={tag}
                          className="tag transition-colors duration-500 group-hover:border-page/30 group-hover:text-page/80"
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
