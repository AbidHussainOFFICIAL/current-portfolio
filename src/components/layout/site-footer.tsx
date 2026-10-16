"use client"

import { usePathname } from "next/navigation"

/** Shows the footer everywhere except on a project page, which ends with its own "Next project" block. */
export function SiteFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (/^\/work\/[^/]+/.test(pathname)) return null
  return <>{children}</>
}
