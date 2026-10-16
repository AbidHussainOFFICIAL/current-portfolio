import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { skills } from "@/content/skills"
import { pad2 } from "@/lib/format"

const toolCount = skills.reduce((total, group) => total + group.items.length, 0)

/** One card per group: the group name, a big outlined count, and every tool as a chip. */
export function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading title="Skills" meta={`${toolCount} tools`} />

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {skills.map((group, index) => (
            <li key={group.name}>
              <Reveal delay={(index % 2) * 0.08} className="h-full">
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{group.name}</h3>
                    <span
                      aria-label={`${group.items.length} tools`}
                      className="font-display text-numeral leading-none text-transparent [-webkit-text-stroke:1px_var(--color-paper)] transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                    >
                      {pad2(group.items.length)}
                    </span>
                  </div>

                  <ul className="mt-10 flex flex-wrap gap-2 md:mt-14">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="tag transition-colors duration-300 hover:border-accent hover:text-accent"
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
