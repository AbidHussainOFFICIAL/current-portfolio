"use client"

import { cn } from "@/lib/cn"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

/** A card with a soft mint light that follows the pointer, and an accent border on hover. */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`)
      }}
      className={cn(
        "group relative h-full overflow-hidden rounded-ui border border-line bg-surface transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/60",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(92 242 196 / 0.14), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  )
}
