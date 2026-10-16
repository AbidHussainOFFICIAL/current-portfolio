import { Award } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { certificates } from "@/content/certificates"
import { pad2 } from "@/lib/format"

/** Credential cards: a big outlined year, the title, then the issuer and type. */
export function Certificates() {
  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading title="Certificates" meta={`${pad2(certificates.length)} credentials`} />

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {certificates.map((certificate, index) => (
            <li key={certificate.title}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-numeral text-transparent [-webkit-text-stroke:1px_var(--color-paper)] transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:var(--color-accent)]">
                      {certificate.year}
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-ui border border-line text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                      <Award className="size-5" aria-hidden />
                    </span>
                  </div>

                  <h3 className="mt-10 font-display text-2xl leading-tight font-bold tracking-tight md:mt-14 md:text-3xl">
                    {certificate.title}
                  </h3>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <p className="label text-muted">{certificate.issuer}</p>
                    <span className="tag">{certificate.type}</span>
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
