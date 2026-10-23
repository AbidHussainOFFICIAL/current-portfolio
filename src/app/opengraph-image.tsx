import { site } from "@/content/site"
import { renderOg } from "@/lib/og"

export const alt = "Portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Default share image for every page without its own. Always English (see the note in lib/og.tsx). */
export default function Image() {
  return renderOg({ eyebrow: `${site.city}, ${site.country}`, title: site.name })
}
