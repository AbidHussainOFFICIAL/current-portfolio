import { ArrowRight } from "lucide-react"

import { BackToTop } from "@/components/ui/back-to-top"
import { CopyEmail } from "@/components/ui/copy-email"
import { LiveClock } from "@/components/ui/live-clock"
import { Magnetic } from "@/components/ui/magnetic"
import { site } from "@/content/site"

/** Closing section. It is also the footer, so it is rendered once in the root layout and fits one screen. */
export function Contact() {
  return (
    <footer id="contact" className="flex min-h-svh flex-col border-t border-line pt-8 md:pt-10">
      <div className="gutter container-page flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center gap-10 py-10 md:flex-row md:items-center md:justify-between">
          {/* Hovering swaps the colours of the two lines, as on Kern. */}
          <a href={`mailto:${site.email}`} data-cursor="" className="group block select-none">
            <span className="block font-display text-[length:min(14vw,17svh)] leading-[0.85] font-extrabold tracking-tighter text-paper uppercase transition-colors duration-500 group-hover:text-accent">
              Let&rsquo;s work
            </span>
            <span className="flex items-center gap-[0.15em] font-display text-[length:min(14vw,17svh)] leading-[0.85] font-extrabold tracking-tighter text-accent uppercase transition-colors duration-500 group-hover:text-paper">
              together
              <ArrowRight
                className="size-[0.55em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-3"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
          </a>

          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="grid size-36 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 hover:scale-105 md:size-48"
            >
              <span className="label">Say hello</span>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-3 pb-8 md:flex-row md:items-center md:gap-8">
          <a
            href={`mailto:${site.email}`}
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
                  className="label link-sweep pb-1 text-muted transition-colors hover:text-paper"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="label flex flex-wrap gap-x-4 text-muted md:col-span-4">
            <span>
              {site.city}, {site.country}
            </span>
            <LiveClock timeZone={site.timezone} label="Local time" />
          </p>

          <div className="flex md:col-span-3 md:justify-end">
            <BackToTop />
          </div>
        </div>

        <p className="gutter container-page pb-6 label text-faint">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
