"use client"

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react"
import { useRef, useState } from "react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { SPRING_SOFT_OPTIONS } from "@/lib/motion"
import { pad2 } from "@/lib/format"
import type { Project } from "@/types/content"

interface WorksListProps {
  projects: Project[]
}

/**
 * Every project as a row. On desktop one preview follows the mouse and the pictures
 * crossfade inside it, so moving between rows never re-enters from the edge.
 */
export function WorksList({ projects }: WorksListProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_SOFT_OPTIONS)
  const springY = useSpring(y, SPRING_SOFT_OPTIONS)
  const velocity = useVelocity(springX)
  const rotate = useTransform(velocity, [-1200, 1200], [-10, 10], { clamp: true })

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
            className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
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
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.15 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CoverImage cover={project.cover} sizes="26vw" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ul className="border-t border-line">
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-line">
            <TransitionLink
              href={`/work/${project.slug}`}
              data-cursor="View"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index)
              }}
              className="group gutter container-page grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3rem_1fr_auto_5rem] md:gap-8 md:py-9"
            >
              <span className="label text-faint transition-colors duration-500 group-hover:text-accent">
                {pad2(index + 1)}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight uppercase transition-transform duration-500 ease-out-expo group-hover:translate-x-4 md:text-5xl md:group-hover:translate-x-8">
                {project.title}
              </h3>
              <span className="label hidden text-muted md:block">{project.category}</span>
              <span className="label text-right text-faint">{project.year}</span>

              {/* Phones have no hover, so each row carries its own picture. */}
              <div className="relative col-span-3 mt-2 aspect-[3/2] w-full overflow-hidden bg-surface md:hidden">
                <CoverImage cover={project.cover} sizes="100vw" />
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
