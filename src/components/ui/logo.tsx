import { LOGO_FRAME, LOGO_LETTERS } from "@/lib/logo"
import { cn } from "@/lib/cn"

/**
 * "AH" monogram: a rounded square in the current text colour with the letters cut out of it,
 * so it inverts together with the header and follows the menu colour.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={cn("size-9", className)} fill="currentColor">
      <path fillRule="evenodd" d={`${LOGO_FRAME}${LOGO_LETTERS}`} />
    </svg>
  )
}
