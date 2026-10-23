"use client"

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { useDictionary, useLocale } from "@/i18n/locale-provider"
import { digits, pad2 } from "@/lib/format"
import { SPRING_SOFT_OPTIONS } from "@/lib/motion"
import { applyPalette, applyPaletteIfSafe, DEFAULT_PALETTE } from "@/lib/palette"
import type { Cover, Palette } from "@/types/content"

/** What one row of the list shows. */
export interface WorkRow {
  slug: string
  title: string
  category: string
  year: number
  palette: Palette
  cover: Cover
}

interface WorksListProps {
  rows: WorkRow[]
}

/**
 * Every project as a row. On desktop one preview follows the mouse and the pictures
 * crossfade inside it, so moving between rows never re-enters from the edge.
 *
 * The row that sits in the middle of the screen also sets the colour palette of the page: this is the
 * first of the two palette moments on the home page. When the list leaves the middle of the screen
 * (and at Contact) the page returns to Violet.
 */
export function WorksList({ rows }: WorksListProps) {
  const dict = useDictionary()
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_SOFT_OPTIONS)
  const springY = useSpring(y, SPRING_SOFT_OPTIONS)
  const velocity = useVelocity(springX)
  const rotate = useTransform(velocity, [-1200, 1200], [-10, 10], { clamp: true })

  // Palette follows the row at the middle of the screen.
  useEffect(() => {
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-row-palette]") ?? [])
    if (items.length === 0) return

    const inside = new Map<Element, Palette>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const palette = entry.target.getAttribute("data-row-palette") as Palette
          if (entry.isIntersecting) inside.set(entry.target, palette)
          else inside.delete(entry.target)
        }
        const palettes = [...inside.values()]
        applyPaletteIfSafe(palettes.length > 0 ? palettes[palettes.length - 1] : DEFAULT_PALETTE)
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      applyPalette(DEFAULT_PALETTE)
    }
  }, [])

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative">
      <AnimatePresence>
        {active !== null ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-(--z-raised) hidden md:block"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={{ rotate }}
              className="relative aspect-[3/2] w-[26vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-surface"
            >
              {rows.map((row, index) => (
                <motion.div
                  key={row.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.15 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CoverImage cover={row.cover} sizes="26vw" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ul className="border-t border-line">
        {rows.map((row, index) => (
          <li key={row.slug} data-row-palette={row.palette} className="border-b border-line">
            <TransitionLink
              href={`/work/${row.slug}`}
              data-cursor={dict.cursor.view}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index)
              }}
              className="group gutter container-page grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3rem_1fr_auto_5rem] md:gap-8 md:py-10"
            >
              <span className="label text-faint transition-colors duration-500 group-hover:text-accent-small">
                {pad2(index + 1, locale)}
              </span>
              <h3 className="font-display text-row uppercase transition-transform duration-500 ease-out-expo group-hover:nudge-4 md:group-hover:nudge-8">
                {row.title}
              </h3>
              <span className="label hidden text-muted md:block">{row.category}</span>
              <span className="label text-end text-faint">{digits(row.year, locale)}</span>

              {/* Phones have no hover, so each row carries its own picture. */}
              <div className="relative col-span-3 mt-2 aspect-[3/2] w-full overflow-hidden bg-surface md:hidden">
                <CoverImage cover={row.cover} sizes="(min-width: 768px) 26vw, 100vw" />
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
