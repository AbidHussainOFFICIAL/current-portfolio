"use client"

import { animate, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { usePreloaded } from "@/hooks/use-preloaded"
import { site } from "@/content/site"
import { DURATION, EASE_IN_OUT } from "@/lib/motion"
import { preloaderStore } from "@/lib/preloader-store"

/** Counter screen shown once per browser session. */
export function Preloader() {
  const done = usePreloaded()
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (done) return
    const controls = animate(0, 100, {
      duration: reduced ? 0.4 : 1.6,
      ease: EASE_IN_OUT,
      onUpdate: (latest) => setCount(Math.round(latest)),
      onComplete: () => setLeaving(true),
    })
    return () => controls.stop()
  }, [done, reduced])

  // Keep the page still behind the preloader.
  useEffect(() => {
    if (done) return
    const root = document.documentElement
    root.style.overflow = "hidden"
    return () => {
      root.style.overflow = ""
    }
  }, [done])

  if (done) return null

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="preloader fixed inset-0 z-(--z-preloader) flex flex-col justify-between bg-ink gutter py-8"
      animate={{ y: leaving ? "-100%" : "0%" }}
      transition={{ duration: DURATION.slow, ease: EASE_IN_OUT }}
      onAnimationComplete={() => {
        if (leaving) preloaderStore.markDone()
      }}
    >
      <div className="label flex justify-between text-muted">
        <span>{site.name}</span>
        <span>{site.city}</span>
      </div>

      <p className="font-display text-hero text-paper tabular-nums">{String(count).padStart(2, "0")}</p>

      <div>
        <div className="h-px w-full bg-line">
          <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <p className="label mt-4 text-faint">{site.role}</p>
      </div>
    </motion.div>
  )
}
