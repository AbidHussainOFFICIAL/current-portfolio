import { cn } from "@/lib/cn"
import { getSite } from "@/lib/content"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

/**
 * One endless strip of technologies. The list is rendered twice so the loop is seamless at -50%.
 * The strip is always left to right: the names are English, and the animation runs one way.
 */
export function Marquee({ locale }: { locale: Locale }) {
  const site = getSite(locale)
  const dict = getDictionary(locale)

  return (
    <section aria-label={dict.marquee.label} dir="ltr" className="overflow-hidden py-6 md:py-10">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {site.marquee.map((item, index) => (
              <li key={item} className="flex items-center">
                <span
                  className={cn(
                    "px-6 font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-none font-extrabold tracking-tight whitespace-nowrap uppercase md:px-10",
                    index % 2 === 1 ? "text-stroke" : "text-fg",
                  )}
                >
                  {item}
                </span>
                <span aria-hidden className="text-2xl text-accent-text md:text-4xl">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
