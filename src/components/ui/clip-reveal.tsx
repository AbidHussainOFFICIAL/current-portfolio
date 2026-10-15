"use client"

import { motion } from "motion/react"

import { EASE_IN_OUT, VIEWPORT_ONCE } from "@/lib/motion"

interface ClipRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Play on load instead of when scrolled into view. */
  immediate?: boolean
}

/** Opens an image frame from a slightly inset clip to full size. */
export function ClipReveal({ children, className, delay = 0, immediate = false }: ClipRevealProps) {
  const target = { clipPath: "inset(0% 0% 0% 0%)" }
  const trigger = immediate
    ? { animate: target }
    : { whileInView: target, viewport: VIEWPORT_ONCE }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(10% 5% 10% 5%)" }}
      {...trigger}
      transition={{ duration: 1, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
