"use client"

import { useSyncExternalStore } from "react"

import { useLocale } from "@/i18n/locale-provider"
import { digits } from "@/lib/format"

interface LiveClockProps {
  /** IANA time zone, e.g. "Asia/Karachi". */
  timeZone: string
  /** Short place code or label shown before the time, e.g. "KHI". */
  label: string
  className?: string
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000)
  return () => clearInterval(id)
}

function readTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date())
}

/** Local time for a place. Shows a placeholder on the server so hydration always matches. */
export function LiveClock({ timeZone, label, className }: LiveClockProps) {
  const locale = useLocale()
  const time = useSyncExternalStore(
    subscribe,
    () => readTime(timeZone),
    () => "--:--",
  )

  return (
    <span className={className}>
      {label} <bdi>{digits(time, locale)}</bdi>
    </span>
  )
}
