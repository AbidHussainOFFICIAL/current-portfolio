import { ArrowRight } from "lucide-react"

import { BackToTop } from "@/components/ui/back-to-top"
import { CopyEmail } from "@/components/ui/copy-email"
import { LiveClock } from "@/components/ui/live-clock"
import { Magnetic } from "@/components/ui/magnetic"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getSite } from "@/lib/content"
import { digits, fmt } from "@/lib/format"

/** Closing section. It is also the footer, so it is rendered once in the root layout and fits one screen. */
export function Contact({ locale }: { locale: Locale }) {
  const site = getSite(locale)
  const dict = getDictionary(locale)

  return (
    <footer id="contact" className="flex min-h-svh flex-col pt-8 md:pt-10">
      <div className="gutter container-page flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center gap-10 py-10 md:flex-row md:items-center md:justify-between">
          {/* Hovering swaps the colours of the two lines, as on Kern. */}
          <a href={`mailto:${site.email}`} data-cursor="" className="group block select-none">
            <span className="display-contact block text-fg transition-colors duration-500 group-hover:text-accent-text">
              {dict.contact.lineOne}
            </span>
            <span className="display-contact flex items-center gap-[0.15em] text-accent-text transition-colors duration-500 group-hover:text-fg">
              {dict.contact.lineTwo}
              <ArrowRight
                className="mirror size-[0.55em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:nudge-3"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
          </a>

          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="grid size-36 place-items-center rounded-full bg-accent text-accent-ink transition-[transform,background-color] duration-500 hover:scale-105 hover:bg-accent-hover active:bg-accent-active md:size-48"
            >
              <span className="label">{dict.common.sayHello}</span>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-3 pb-8 md:flex-row md:items-center md:gap-8">
          <a
            href={`mailto:${site.email}`}
            dir="ltr"
            className="link-sweep w-fit font-display text-xl font-bold tracking-tight md:text-3xl"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="gutter container-page grid gap-6 py-6 md:grid-cols-12 md:items-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 md:col-span-5">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-sweep tap pb-1 text-muted transition-colors hover:text-fg"
                >
                  {social.label}
                  <span className="sr-only"> {dict.common.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="label flex flex-wrap gap-x-4 text-muted md:col-span-4">
            <span>{fmt(dict.about.placeOfWork, { city: site.city, country: site.country }, locale)}</span>
            <LiveClock timeZone={site.timezone} label={dict.common.localTime} />
          </p>

          <div className="flex md:col-span-3 md:justify-end">
            <BackToTop />
          </div>
        </div>

        <p className="gutter container-page label pb-6 text-faint">
          &copy; {digits(new Date().getFullYear(), locale)} {site.name} · {dict.common.rights}
        </p>
      </div>
    </footer>
  )
}
