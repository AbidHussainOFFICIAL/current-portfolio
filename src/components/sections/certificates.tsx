import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { certificates } from "@/content/certificates"

export function Certificates() {
  return (
    <section id="certificates" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading index="05" label="Certificates" title="Certificates" />

        <ul className="border-b border-line">
          {certificates.map((certificate) => (
            <li key={certificate.credentialId} className="border-t border-line">
              <Reveal>
                <div className="grid items-baseline gap-2 py-7 transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:gap-10 md:py-9 md:hover:px-6">
                  <p className="label text-muted md:col-span-1">{certificate.year}</p>
                  <h3 className="text-xl font-medium md:col-span-5 md:text-2xl">{certificate.title}</h3>
                  <p className="text-muted md:col-span-3">{certificate.issuer}</p>
                  <div className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
                    <p className="label text-faint">{certificate.credentialId}</p>
                    {certificate.url ? (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label inline-flex items-center gap-1.5 text-paper transition-colors hover:text-accent"
                      >
                        Verify
                        <ArrowUpRight className="size-4" aria-hidden />
                        <span className="sr-only">{certificate.title} credential (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
