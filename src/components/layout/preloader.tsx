"use client"

import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { usePreloaded } from "@/hooks/use-preloaded"
import { site } from "@/content/site"
import { DURATION, EASE_IN_OUT } from "@/lib/motion"
import { PRELOADER_MS, preloaderStore } from "@/lib/preloader-store"

/**
 * Counter screen shown once per browser session. The 00 to 100 count and the bar run in
 * CSS (see globals.css) so they start on first paint. React only decides when to slide it away.
 */
export function Preloader() {
  const done = usePreloaded()
  const reduced = useReducedMotion()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (done) return
    // The CSS count started at page load, so only wait for what is left of it.
    const total = reduced ? 0 : PRELOADER_MS
    const wait = Math.max(200, total - performance.now())
    const timer = setTimeout(() => setLeaving(true), wait)
    return () => clearTimeout(timer)
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

      <p aria-hidden className="font-display text-hero text-paper tabular-nums">
        <span className="preloader-count" />
      </p>

      <div>
        <div className="h-px w-full bg-line">
          <div className="preloader-bar h-full bg-accent" />
        </div>
        <p className="label mt-4 text-muted">{site.role}</p>
      </div>
    </motion.div>
  )
}
