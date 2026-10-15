"use client"

import { ArrowUpRight } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import { useState } from "react"

import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { cn } from "@/lib/cn"
import { SPRING_SOFT_OPTIONS } from "@/lib/motion"
import type { Project } from "@/types/content"

interface ProjectIndexProps {
  projects: Project[]
}

/**
 * Compact list of every project. On desktop a preview image follows the mouse
 * and tilts with its speed.
 */
export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_SOFT_OPTIONS)
  const springY = useSpring(y, SPRING_SOFT_OPTIONS)
  const velocityX = useVelocity(springX)
  const tilt = useTransform(velocityX, [-1500, 1500], [-10, 10], { clamp: true })
  const rotate = useSpring(tilt, SPRING_SOFT_OPTIONS)

  const active = activeIndex === null ? null : projects[activeIndex]

  return (
    <>
      <ul
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return
          x.set(event.clientX)
          y.set(event.clientY)
        }}
        onPointerLeave={() => setActiveIndex(null)}
      >
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-line">
            <TransitionLink
              href={`/work/${project.slug}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActiveIndex(index)
              }}
              className={cn(
                "group flex items-baseline gap-4 py-6 transition-opacity duration-500 md:gap-8 md:py-8",
                activeIndex !== null && activeIndex !== index && "md:opacity-40",
              )}
            >
              <span className="label w-12 shrink-0 text-faint md:w-20">{project.year}</span>
              <span className="flex-1 font-display text-row uppercase transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                {project.title}
              </span>
              <span className="label hidden text-muted sm:block">{project.category}</span>
              <ArrowUpRight
                className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent"
                aria-hidden
              />
            </TransitionLink>
          </li>
        ))}
      </ul>

      {/* Floating preview (mouse only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{ x: springX, y: springY, rotate }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <AnimatePresence>
            {active ? (
              <motion.div
                key={active.slug}
                className="relative aspect-[4/5] w-72 overflow-hidden bg-surface lg:w-80"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <CoverImage cover={active.cover} sizes="320px" label={active.title} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
