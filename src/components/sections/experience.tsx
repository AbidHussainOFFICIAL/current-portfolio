import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { experience } from "@/content/experience"

export function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading index="04" label="Experience" title="Experience" />

        <ul className="border-b border-line">
          {experience.map((role) => (
            <li key={`${role.company}-${role.years}`} className="border-t border-line">
              <Reveal>
                <div className="group grid items-baseline gap-2 py-7 transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:gap-10 md:py-10 md:hover:px-6">
                  <p className="label text-muted md:col-span-3">{role.years}</p>
                  <h3 className="font-display text-row uppercase md:col-span-6">{role.title}</h3>
                  <p className="flex items-center gap-3 text-muted md:col-span-3 md:justify-end">
                    {role.company}
                    {role.current ? (
                      <span className="label inline-flex items-center gap-2 text-accent">
                        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                        Now
                      </span>
                    ) : null}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
