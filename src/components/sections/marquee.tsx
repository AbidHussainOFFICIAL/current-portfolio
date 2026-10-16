import { site } from "@/content/site"
import { cn } from "@/lib/cn"

interface RowProps {
  items: string[]
  reverse?: boolean
  /** Hidden from assistive tech so the list is not read twice. */
  decorative?: boolean
}

/** One strip. The list is rendered twice so the loop is seamless at -50%. */
function Row({ items, reverse = false, decorative = false }: RowProps) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn(
        "flex w-max hover:[animation-play-state:paused]",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <li key={item} className="flex items-center">
              <span
                className={cn(
                  "px-6 font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-none font-extrabold tracking-tight whitespace-nowrap uppercase md:px-10",
                  index % 2 === 1 ? "text-stroke" : "text-paper",
                )}
              >
                {item}
              </span>
              <span aria-hidden className="text-2xl text-accent md:text-4xl">
                ✦
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

/** Two endless strips of technologies that run in opposite directions. */
export function Marquee() {
  const reversed = [...site.marquee].reverse()

  return (
    <section
      aria-label="Technologies I work with"
      className="flex flex-col gap-4 overflow-hidden border-y border-line py-6 md:gap-6 md:py-10"
    >
      <Row items={site.marquee} />
      <Row items={reversed} reverse decorative />
    </section>
  )
}
