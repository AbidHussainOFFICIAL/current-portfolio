"use client"

import Link from "next/link"
import type { ComponentProps } from "react"

import { usePageTransition } from "@/components/layout/page-transition"

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
  /** Called when the click is handled as an in-site navigation (e.g. to close the menu). */
  onNavigate?: () => void
}

/** Internal link that plays the page curtain and handles same-page hash scrolling. */
export function TransitionLink({ href, onClick, onNavigate, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition()

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
        if (rest.target === "_blank") return
        event.preventDefault()
        onNavigate?.()
        navigate(href)
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
