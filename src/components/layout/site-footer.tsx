"use client"

import { usePathname } from "next/navigation"

import { splitLocale } from "@/i18n/config"

/** Shows the footer everywhere except on a project page, which ends with its own "Next project" block. */
export function SiteFooter({ children }: { children: React.ReactNode }) {
  const { path } = splitLocale(usePathname())
  if (/^\/work\/[^/]+/.test(path)) return null
  return <>{children}</>
}
