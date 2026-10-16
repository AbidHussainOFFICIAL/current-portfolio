"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { CoverImage } from "@/components/ui/cover-image"
import { cn } from "@/lib/cn"
import type { Cover } from "@/types/content"

/** Extra picture kept above and below the frame, in percent of the frame height. */
const HEADROOM = 12

/** Percent of the picture's own height it may travel so an edge never shows (height is 100 + 2 x HEADROOM). */
const SHIFT = (HEADROOM / (100 + 2 * HEADROOM)) * 100

interface ParallaxFrameProps {
  cover: Cover
  sizes: string
  priority?: boolean
  /** Shape of the frame, e.g. "aspect-[16/9]". */
  className?: string
}

/** A picture frame whose picture drifts slowly against the scroll (Noir). */
export function ParallaxFrame({ cover, sizes, priority, className }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${SHIFT}%`, `${SHIFT}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)}>
      <motion.div
        style={{ y, top: `-${HEADROOM}%`, height: `${100 + 2 * HEADROOM}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        <CoverImage cover={cover} sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  )
}
