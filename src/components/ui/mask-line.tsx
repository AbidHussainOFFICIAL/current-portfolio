"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/cn"
import { DURATION, EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion"

interface MaskLineProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Play on load instead of when scrolled into view. */
  immediate?: boolean
}

/** Slides a line of text up out of a clipped box. Urdu gets extra room above and below for the tall letters. */
export function MaskLine({ children, className, delay = 0, immediate = false }: MaskLineProps) {
  const trigger = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: VIEWPORT_ONCE }

  return (
    <span
      className={cn("-mb-[0.12em] block overflow-hidden pb-[0.12em] ur:-my-[0.3em] ur:py-[0.3em]", className)}
    >
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        {...trigger}
        transition={{ duration: DURATION.slow, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
