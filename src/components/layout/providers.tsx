"use client"

import { MotionConfig, useReducedMotion } from "motion/react"
import { ReactLenis } from "lenis/react"
import { useMemo } from "react"

import { PageTransitionProvider } from "@/components/layout/page-transition"

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const options = useMemo(() => ({ lerp: 0.1, smoothWheel: reduced !== true }), [reduced])

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </SmoothScroll>
    </MotionConfig>
  )
}
