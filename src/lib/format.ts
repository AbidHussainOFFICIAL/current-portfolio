/** "2026-09-12" -> "12 Sep 2026". Fixed to UTC so server and browser always agree. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}

/** 1 -> "01", 12 -> "12" */
export function pad2(n: number): string {
  return String(n).padStart(2, "0")
}
