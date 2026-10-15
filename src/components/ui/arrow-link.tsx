import { ArrowRight } from "lucide-react"

import { TransitionLink } from "@/components/ui/transition-link"
import { cn } from "@/lib/cn"

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

/** Mono label link with an arrow that nudges forward on hover. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <TransitionLink
      href={href}
      className={cn("group label inline-flex items-center gap-3 text-paper", className)}
    >
      <span className="link-sweep pb-1">{children}</span>
      <ArrowRight
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
        aria-hidden
      />
    </TransitionLink>
  )
}
