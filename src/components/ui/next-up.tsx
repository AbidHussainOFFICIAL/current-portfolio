import { ArrowRight } from "lucide-react"

import { TransitionLink } from "@/components/ui/transition-link"

interface NextUpProps {
  /** Small label, e.g. "Next project". */
  label: string
  title: string
  href: string
}

/** Full-width link to the next project or article. */
export function NextUp({ label, title, href }: NextUpProps) {
  return (
    <TransitionLink href={href} className="group block border-t border-line">
      <div className="gutter container-page py-16 md:py-28">
        <p className="label text-muted">{label}</p>
        <p className="mt-6 flex items-end justify-between gap-8 font-display text-section transition-colors duration-500 group-hover:text-accent">
          <span className="block max-w-[18ch] uppercase">{title}</span>
          <ArrowRight
            className="mb-[0.2em] size-[0.5em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-3"
            aria-hidden
          />
        </p>
      </div>
    </TransitionLink>
  )
}
