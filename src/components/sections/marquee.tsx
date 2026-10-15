import { site } from "@/content/site"

/** Endless strip of technologies. The second copy is hidden from assistive tech. */
export function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="overflow-hidden border-y border-line py-6 md:py-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {site.marquee.map((item) => (
              <li key={item} className="flex items-center font-display text-row text-paper uppercase">
                {item}
                <span aria-hidden className="mx-8 size-2.5 rounded-full bg-accent md:mx-12" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
