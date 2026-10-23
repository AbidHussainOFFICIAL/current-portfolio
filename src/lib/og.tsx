import { ImageResponse } from "next/og"

import { site } from "@/content/site"
import { LOGO_FRAME, LOGO_INK, LOGO_LETTERS, LOGO_MARK_GRADIENT } from "@/lib/logo"

interface OgOptions {
  eyebrow: string
  title: string
}

// Brand colours (Colour kit, Violet, dark): page, text, muted text, accent.
const PAGE = "#0B0B0C"
const TEXT = "#F2F2F0"
const MUTED = "#A5A6A5"
const ACCENT = "#A99BFF"

/**
 * Social share image: dark card, violet accent, large title.
 * The text is always English. The renderer has no Urdu font, and a share picture is the same for both
 * languages (the page text around it is translated).
 */
export function renderOg({ eyebrow, title }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAGE,
          color: TEXT,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: MUTED }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={LOGO_MARK_GRADIENT[0]} />
                <stop offset="1" stopColor={LOGO_MARK_GRADIENT[1]} />
              </linearGradient>
            </defs>
            <path fill="url(#g)" d={LOGO_FRAME} />
            <path fill={LOGO_INK} fillRule="evenodd" d={LOGO_LETTERS} transform="translate(0 2)" />
          </svg>
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", width: 120, height: 8, background: ACCENT }} />
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: MUTED }}>
          <span>{site.name}</span>
          <span>{site.role}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
