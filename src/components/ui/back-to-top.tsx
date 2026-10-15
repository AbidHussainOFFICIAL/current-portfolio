"use client"

import { ArrowUp } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useLenis } from "lenis/react"

/** Scrolls to the top of the current page. */
export function BackToTop() {
  const lenis = useLenis()
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { immediate: reduced === true })
        else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }}
      className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-paper"
    >
      Back to top
      <ArrowUp className="size-4" aria-hidden />
    </button>
  )
}
