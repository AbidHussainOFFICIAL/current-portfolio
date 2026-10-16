"use client"

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react"
import { useEffect, useRef } from "react"

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
  y: MotionValue<number>
  columnRef: React.RefObject<HTMLDivElement | null>
}

function Column({ tiles, y, columnRef }: ColumnProps) {
  return (
    <motion.div ref={columnRef} style={{ y }} className="flex flex-col gap-[3vh] py-[3vh] will-change-transform">
      {tiles.map((tile, index) => (
        <TransitionLink
          key={`${tile.slug}-${index}`}
          href={`/work/${tile.slug}`}
          data-cursor="View"
          className="group relative block aspect-[3/4] overflow-hidden bg-surface md:aspect-[16/10]"
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
 * Two image columns that travel in opposite directions while the title stays pinned in the
 * middle of the screen (Kern). Each column moves exactly as far as it is taller than the screen,
 * so the pictures never run out and never leave a gap, whatever the number of tiles.
 */
export function SplitScroll({ left, right }: SplitScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  // How far each column is taller than the stage, in pixels. Measured, and kept up to date on resize.
  const leftTravel = useMotionValue(0)
  const rightTravel = useMotionValue(0)

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })

  useEffect(() => {
    const stage = stageRef.current
    const leftColumn = leftRef.current
    const rightColumn = rightRef.current
    if (!stage || !leftColumn || !rightColumn) return

    function measure() {
      const height = stage!.clientHeight
      leftTravel.set(Math.max(0, leftColumn!.offsetHeight - height))
      rightTravel.set(Math.max(0, rightColumn!.offsetHeight - height))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(leftColumn)
    observer.observe(rightColumn)
    return () => observer.disconnect()
  }, [leftTravel, rightTravel])

  // The left column starts at its top and ends at its bottom. The right one does the opposite.
  const yLeft = useTransform([scrollYProgress, leftTravel], (values: number[]) => -values[0] * values[1])
  const yRight = useTransform([scrollYProgress, rightTravel], (values: number[]) => -(1 - values[0]) * values[1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        <div className="grid h-full w-full grid-cols-2 items-start gap-[3vh] px-[3vh] md:grid-cols-[1fr_1.2fr_1fr] md:px-[6vw]">
          <Column tiles={left} y={yLeft} columnRef={leftRef} />
          <div className="hidden md:block" />
          <Column tiles={right} y={yRight} columnRef={rightRef} />
        </div>

        {/* White text with the difference blend: it inverts whatever picture is behind it. */}
        <motion.div
          style={{ scale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center mix-blend-difference"
        >
          <h2 className="text-center font-display text-[13vw] leading-[0.85] font-extrabold tracking-tighter text-white uppercase md:text-[9vw]">
            Selected
            <br />
            Works
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
