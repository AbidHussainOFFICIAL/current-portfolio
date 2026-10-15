"use client"

import { motion } from "motion/react"

import { DURATION, EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Seconds to wait before the animation starts. */
  delay?: number
}

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
