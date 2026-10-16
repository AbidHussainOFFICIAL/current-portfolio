import { ImageResponse } from "next/og"

import { LOGO_LETTERS, LOGO_MARK_GRADIENT } from "@/lib/logo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Home-screen icon. Full-bleed square: iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={LOGO_MARK_GRADIENT[0]} />
              <stop offset="1" stopColor={LOGO_MARK_GRADIENT[1]} />
            </linearGradient>
          </defs>
          <rect width="64" height="64" fill="url(#g)" />
          <path fill="#0B0B0C" fillRule="evenodd" d={LOGO_LETTERS} transform="translate(0 2)" />
        </svg>
      </div>
    ),
    size,
  )
}
