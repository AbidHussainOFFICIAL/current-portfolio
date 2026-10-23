"use client"

import Link from "next/link"
import type { ComponentProps } from "react"

import { usePageTransition } from "@/components/layout/page-transition"
import { localePath } from "@/i18n/config"
import { useLocale } from "@/i18n/locale-provider"

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Language-free path, e.g. "/work" or "/#about". The language of the page is added here. */
  href: string
  /** Called when the click is handled as an in-site navigation (e.g. to close the menu). */
  onNavigate?: () => void
  /** Jump straight to a same-page section instead of scrolling there. */
  instant?: boolean
}

/** Internal link that plays the page curtain, handles same-page hash scrolling and keeps the page language. */
export function TransitionLink({ href, onClick, onNavigate, instant, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition()
  const locale = useLocale()
  const target = localePath(locale, href)

  return (
    <Link
      href={target}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
        if (rest.target === "_blank") return
        event.preventDefault()
        onNavigate?.()
        navigate(target, { instant })
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
