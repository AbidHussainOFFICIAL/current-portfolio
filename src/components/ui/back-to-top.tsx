"use client"

import { ArrowUp } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useLenis } from "lenis/react"

import { useDictionary } from "@/i18n/locale-provider"

/** Scrolls to the top of the current page. */
export function BackToTop() {
  const lenis = useLenis()
  const reduced = useReducedMotion()
  const dict = useDictionary()

  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { immediate: reduced === true })
        else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }}
      className="label inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
    >
      {dict.common.backToTop}
      <ArrowUp className="size-4" aria-hidden />
    </button>
  )
}
