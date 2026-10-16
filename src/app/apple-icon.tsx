import { ImageResponse } from "next/og"

import { LOGO_LETTERS } from "@/lib/logo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Home-screen icon. Full-bleed mint square: iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#5CF2C4" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path fill="#0B0B0C" fillRule="evenodd" d={LOGO_LETTERS} />
        </svg>
      </div>
    ),
    size,
  )
}
