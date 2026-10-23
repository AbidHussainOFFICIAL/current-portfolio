"use client"

import { useEffect } from "react"

import { applyPalette, DEFAULT_PALETTE } from "@/lib/palette"
import type { Palette } from "@/types/content"

/**
 * Gives a page its own colour palette. The marker element lets CSS colour the page on the very first
 * paint (styles/palettes.css reads it with :has), and the effect keeps the palette in step while the
 * visitor moves between pages. Leaving the page returns the site to Violet.
 */
export function PaletteScope({ palette }: { palette: Palette }) {
  useEffect(() => {
    applyPalette(palette)
    return () => applyPalette(DEFAULT_PALETTE)
  }, [palette])

  return <span hidden data-page-palette={palette} />
}
