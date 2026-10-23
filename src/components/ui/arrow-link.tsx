import { ArrowRight } from "lucide-react"

import { TransitionLink } from "@/components/ui/transition-link"
import { cn } from "@/lib/cn"

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/** Label link with an arrow that nudges forward on hover (and points the other way in Urdu). */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <TransitionLink
      href={href}
      className={cn("group label inline-flex min-h-11 items-center gap-3 text-fg", className)}
    >
      <span className="link-sweep pb-1">{children}</span>
      <ArrowRight
        className="mirror size-4 transition-transform duration-500 ease-out-expo group-hover:nudge-2"
        aria-hidden
      />
    </TransitionLink>
  )
}
