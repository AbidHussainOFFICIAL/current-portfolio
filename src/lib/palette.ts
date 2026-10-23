import type { Palette } from "@/types/content"

/** The palette of every page that does not choose its own. */
export const DEFAULT_PALETTE: Palette = "violet"

/**
 * Sets the palette of the whole page. Violet is the default, so it simply clears the attribute.
 * The change glides over 0.7 s (see styles/palettes.css) and is instant for reduced motion.
 */
export function applyPalette(palette: Palette) {
  const root = document.documentElement
  if (palette === DEFAULT_PALETTE) root.removeAttribute("data-palette")
  else root.setAttribute("data-palette", palette)
}

/**
 * A palette change repaints every colour. Never do it while the visitor is selecting text or typing
 * in a field, because the highlight or the caret would jump under their hand.
 */
export function canSwapPalette(): boolean {
  const selection = window.getSelection()
  if (selection && !selection.isCollapsed && selection.toString().trim() !== "") return false

  const active = document.activeElement
  if (active instanceof HTMLElement) {
    const tag = active.tagName
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active.isContentEditable) return false
  }
  return true
}

/** Applies a palette only when it is safe to do so. Returns whether it was applied. */
export function applyPaletteIfSafe(palette: Palette): boolean {
  if (!canSwapPalette()) return false
  applyPalette(palette)
  return true
}
