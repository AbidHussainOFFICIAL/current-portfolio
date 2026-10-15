import { ArrowUpRight } from "lucide-react"

import { BackToTop } from "@/components/ui/back-to-top"
import { CopyEmail } from "@/components/ui/copy-email"
import { LiveClock } from "@/components/ui/live-clock"
import { Magnetic } from "@/components/ui/magnetic"
import { MaskLine } from "@/components/ui/mask-line"
import { site } from "@/content/site"

/** Closing section. It is also the footer, so it is rendered once in the root layout. */
export function Contact() {
  return (
    <footer id="contact" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <p className="label border-b border-line pb-4 text-muted">
          <span className="text-accent">07</span> / Contact
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-section uppercase md:col-span-9">
            <MaskLine>Let&rsquo;s work</MaskLine>
            <MaskLine delay={0.1}>together</MaskLine>
          </h2>

          <div className="md:col-span-3 md:justify-self-end">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group grid size-36 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 hover:scale-105 md:size-44"
              >
                <span className="label flex items-center gap-2">
                  Say hello
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 md:mt-24 md:flex-row md:items-center md:gap-10">
          <a
            href={`mailto:${site.email}`}
            className="link-sweep w-fit font-display text-2xl font-bold tracking-tight md:text-4xl"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-8 md:mt-32 md:grid-cols-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-6">
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

          <div className="label flex flex-col gap-3 text-muted md:col-span-3">
            <p>
              {site.city}, {site.country}
            </p>
            <LiveClock timeZone={site.timezone} label="Local time" />
          </div>

          <div className="flex md:col-span-3 md:justify-end">
            <BackToTop />
          </div>
        </div>

        <p className="label mt-14 text-faint">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
