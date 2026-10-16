import Image from "next/image"

import { cn } from "@/lib/cn"
import type { Cover } from "@/types/content"

interface CoverImageProps {
  cover: Cover
  /** The parent must be positioned (relative) and sized, for example with an aspect ratio. */
  sizes: string
  priority?: boolean
  className?: string
}

/** A picture that fills its parent. */
export function CoverImage({ cover, sizes, priority, className }: CoverImageProps) {
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
