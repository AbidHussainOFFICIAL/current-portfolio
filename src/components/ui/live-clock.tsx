"use client"

import { useSyncExternalStore } from "react"

interface LiveClockProps {
  /** IANA time zone, e.g. "Asia/Karachi". */
  timeZone: string
  /** Short place code shown before the time, e.g. "KHI". */
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
  const time = useSyncExternalStore(
    subscribe,
    () => readTime(timeZone),
    () => "--:--",
  )

  return (
    <span className={className}>
      {label} {time}
    </span>
  )
}
