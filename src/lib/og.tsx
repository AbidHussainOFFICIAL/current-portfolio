import { ImageResponse } from "next/og"

import { site } from "@/content/site"
import { LOGO_FRAME, LOGO_LETTERS } from "@/lib/logo"

interface OgOptions {
  eyebrow: string
  title: string
}

/** Social share image: dark card, mint accent, large title. */
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
          background: "#0B0B0C",
          color: "#ECEBE6",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: "#9A9994" }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <path fill="#5CF2C4" d={LOGO_FRAME} />
            <path fill="#0B0B0C" fillRule="evenodd" d={LOGO_LETTERS} />
          </svg>
          {eyebrow}
        </div>

        <div style={{ display: "flex", fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#9A9994" }}>
          <span>{site.name}</span>
          <span>{site.role}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
