import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { skills } from "@/content/skills"
import { pad2 } from "@/lib/format"

const toolCount = skills.reduce((total, group) => total + group.items.length, 0)

/** Awards-ledger layout (Noir and Kern) used for the skills and stack. */
export function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading title="Skills" meta={`${toolCount} tools`} />
      </div>

      <ul className="border-t border-line">
        {skills.map((group, index) => (
          <li key={group.name} className="border-b border-line">
            <Reveal delay={index * 0.07}>
              <div className="group gutter container-page grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-3 py-6 transition-colors duration-500 hover:bg-paper/5 md:grid-cols-[1fr_2fr_auto] md:py-8">
                <h3 className="font-display text-xl font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-3xl">
                  {group.name}
                </h3>
                <p className="order-last col-span-2 text-muted md:order-none md:col-span-1">
                  {group.items.join("  ·  ")}
                </p>
                <span className="label text-accent">{pad2(group.items.length)}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
