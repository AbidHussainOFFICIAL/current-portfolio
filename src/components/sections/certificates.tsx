import { Award } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getCertificates } from "@/lib/content"
import { fmt, pad2 } from "@/lib/format"

/** Credential cards: a big outlined year, the title, then the issuer and type. */
export function Certificates({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const certificates = getCertificates(locale)
  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading
          title={dict.certificates.title}
          meta={fmt(dict.certificates.count, { n: pad2(certificates.length, locale) }, locale)}
        />

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {certificates.map((certificate, index) => (
            <li key={certificate.title}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <SpotlightCard className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-numeral text-stroke transition-[-webkit-text-stroke-color] duration-500 group-hover:text-stroke-accent">
                      {certificate.year}
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-md border border-line-strong text-accent-small transition-colors duration-500 group-hover:border-accent-edge group-hover:bg-accent group-hover:text-accent-ink">
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
