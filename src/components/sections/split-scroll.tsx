"use client"

import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Cover } from "@/types/content"

export interface SplitScrollTile {
  slug: string
  title: string
  cover: Cover
}

interface ColumnProps {
  tiles: SplitScrollTile[]
  y: MotionValue<string>
}

function Column({ tiles, y }: ColumnProps) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-[3vh]">
      {tiles.map((tile) => (
        <TransitionLink
          key={`${tile.slug}-${tile.cover.alt}-${tile.cover.gradient}`}
          href={`/work/${tile.slug}`}
          data-cursor="View"
          className="group relative block aspect-[3/4] overflow-hidden bg-surface"
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
            <CoverImage cover={tile.cover} sizes="(min-width: 768px) 30vw, 45vw" />
          </div>
          <span className="sr-only">{tile.title}</span>
        </TransitionLink>
      ))}
    </motion.div>
  )
}

interface SplitScrollProps {
  left: SplitScrollTile[]
  right: SplitScrollTile[]
}

/**
 * Two image columns that travel in opposite directions while the title stays
 * pinned in the middle of the screen.
 */
export function SplitScroll({ left, right }: SplitScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const yLeft = useTransform(scrollYProgress, [0, 1], ["2%", "-34%"])
  const yRight = useTransform(scrollYProgress, [0, 1], ["-34%", "2%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="grid h-full w-full grid-cols-2 items-center gap-[3vh] px-[3vh] md:grid-cols-[1fr_1.2fr_1fr] md:px-[6vw]">
          <Column tiles={left} y={yLeft} />
          <div className="hidden md:block" />
          <Column tiles={right} y={yRight} />
        </div>

        <motion.div
          style={{ scale }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center mix-blend-difference"
        >
          <p className="label mb-4 text-paper">( 2025 — 2026 )</p>
          <h2 className="text-center font-display text-[13vw] leading-[0.85] font-extrabold tracking-tighter text-paper uppercase md:text-[9vw]">
            Selected
            <br />
            <span className="text-accent">Works</span>
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
