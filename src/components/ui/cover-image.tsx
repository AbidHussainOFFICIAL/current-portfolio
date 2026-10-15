import Image from "next/image"

import { cn } from "@/lib/cn"
import type { Cover } from "@/types/content"

interface CoverImageProps {
  cover: Cover
  /** The parent must be positioned (relative) and sized, for example with an aspect ratio. */
  sizes: string
  priority?: boolean
  /** Text shown faintly over the gradient placeholder. */
  label?: string
  className?: string
}

/** Shows the real image when cover.src is set, otherwise the gradient placeholder. */
export function CoverImage({ cover, sizes, priority, label, className }: CoverImageProps) {
  if (cover.src) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={cover.alt}
      className={cn("absolute inset-0", className)}
      style={{ background: cover.gradient }}
    >
      {label ? (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center p-6 text-center font-display text-row text-paper/10 uppercase"
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
