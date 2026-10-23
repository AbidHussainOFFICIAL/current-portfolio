import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getSkills } from "@/lib/content"
import { fmt, pad2 } from "@/lib/format"

/** One card per group: the group name, a big outlined count, and every tool as a chip. */
export function Skills({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const skills = getSkills(locale)
  const toolCount = skills.reduce((total, group) => total + group.items.length, 0)

  return (
    <section id="skills" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading title={dict.skills.title} meta={fmt(dict.skills.count, { n: toolCount }, locale)} />

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {skills.map((group, index) => (
            <li key={group.name}>
              <Reveal delay={(index % 2) * 0.08} className="h-full">
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-row">{group.name}</h3>
                    <span
                      aria-label={fmt(dict.skills.groupCount, { n: group.items.length }, locale)}
                      className="font-display text-numeral text-stroke transition-[-webkit-text-stroke-color] duration-500 group-hover:text-stroke-accent"
                    >
                      {pad2(group.items.length, locale)}
                    </span>
                  </div>

                  {/* The tool names are English everywhere, so each chip reads left to right. */}
                  <ul className="mt-10 flex flex-wrap gap-2 md:mt-14">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        dir="ltr"
                        className="tag transition-colors duration-300 hover:border-accent-edge hover:text-accent-small"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
