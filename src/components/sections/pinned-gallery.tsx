"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { ArrowLink } from "@/components/ui/arrow-link"
import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import { DURATION, EASE_OUT } from "@/lib/motion"
import { pad2 } from "@/lib/format"
import type { Project } from "@/types/content"

interface PinnedGalleryProps {
  projects: Project[]
}

/**
 * Desktop only. The left column stays pinned and shows the project that is
 * crossing the middle of the screen while the right column scrolls.
 */
export function PinnedGallery({ projects }: PinnedGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  return (
    <div className="hidden grid-cols-12 gap-10 lg:grid">
      <div className="col-span-5">
        <div className="sticky top-0 flex h-svh flex-col justify-center">
          <p className="label text-muted">
            <span className="text-accent">{pad2(activeIndex + 1)}</span> / {pad2(projects.length)}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              className="mt-8"
            >
              <h3 className="font-display text-section uppercase">{active.title}</h3>
              <p className="label mt-6 text-muted">
                {active.category} · {active.year}
              </p>
              <p className="mt-6 max-w-md text-lead text-muted">{active.intro}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <li key={tech} className="label rounded-full border border-line px-3 py-1.5 text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
              <ArrowLink href={`/work/${active.slug}`} className="mt-10">
                View case study
              </ArrowLink>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ul className="col-span-7 flex flex-col gap-[30svh] pt-[20svh] pb-[20svh]">
        {projects.map((project, index) => (
          <motion.li
            key={project.slug}
            onViewportEnter={() => setActiveIndex(index)}
            viewport={{ margin: "-50% 0px -50% 0px" }}
          >
            <TransitionLink href={`/work/${project.slug}`} className="group block" data-cursor="View">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-105">
                  <CoverImage
                    cover={project.cover}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    label={project.title}
                  />
                </div>
              </div>
              <span className="sr-only">{project.title}</span>
            </TransitionLink>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
