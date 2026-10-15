import { ImageResponse } from "next/og"

import { site } from "@/content/site"

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
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#9A9994" }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#5CF2C4" }} />
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
