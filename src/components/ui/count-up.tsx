"use client"

import { animate, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { EASE_OUT } from "@/lib/motion"

interface CountUpProps {
  value: number
  suffix?: string
}

/** Counts from 0 to value the first time it scrolls into view. */
export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  )
}
