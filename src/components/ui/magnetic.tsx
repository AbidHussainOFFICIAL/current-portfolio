"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/cn"
import { SPRING_SOFT_OPTIONS } from "@/lib/motion"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** How far the content follows the pointer, 0 to 1. */
  strength?: number
}

/** Pulls its content gently toward the mouse pointer. Does nothing for touch. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_SOFT_OPTIONS)
  const springY = useSpring(y, SPRING_SOFT_OPTIONS)

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
