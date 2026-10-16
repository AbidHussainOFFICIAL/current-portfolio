import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { certificates } from "@/content/certificates"
import { pad2 } from "@/lib/format"

/** Awards-ledger layout (Kern and Noir): title and issuer, type, year. Lines run edge to edge. */
export function Certificates() {
  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading title="Certificates" meta={`${pad2(certificates.length)} credentials`} />
      </div>

      <ul className="border-t border-line">
        {certificates.map((certificate, index) => (
          <li key={certificate.title} className="border-b border-line">
            <Reveal delay={index * 0.06}>
              <div className="group gutter container-page grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 transition-colors duration-500 hover:bg-paper/5 md:grid-cols-[2fr_1fr_auto] md:py-8">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-3xl">
                    {certificate.title}
                  </h3>
                  <p className="label mt-2 text-muted">{certificate.issuer}</p>
                </div>
                <p className="label hidden text-muted md:block">{certificate.type}</p>
                <p className="label text-right text-accent">{certificate.year}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
