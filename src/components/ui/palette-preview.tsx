"use client"

import { useEffect, useRef } from "react"

import { applyPaletteIfSafe } from "@/lib/palette"
import type { Palette } from "@/types/content"

interface PalettePreviewProps {
  /** Palette of the project shown in this block. */
  preview: Palette
  /** Palette of the page the block sits on. Restored when the block leaves the screen. */
  current: Palette
  children: React.ReactNode
}

/**
 * Wraps the "Next project" block. While most of the block is on screen the whole page takes on the
 * colours of the next project, as a preview. Scrolling back up restores the page's own palette.
 */
export function PalettePreview({ preview, current, children }: PalettePreviewProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let showing = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting
        if (next === showing) return
        if (applyPaletteIfSafe(next ? preview : current)) showing = next
      },
      { threshold: 0.55 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [preview, current])

  return <div ref={ref}>{children}</div>
}
