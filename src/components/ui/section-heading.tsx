import { LetterMask } from "@/components/ui/letter-mask"
import { MaskLine } from "@/components/ui/mask-line"
import { cn } from "@/lib/cn"

interface SectionHeadingProps {
  title: string
  /** Small text on the right of the same line, such as a count, a date range or a link. */
  meta?: React.ReactNode
  /** The big, letter-by-letter style used for the About heading. */
  large?: boolean
}

/** One bold uppercase title on the left and a small meta on the right, on the same line. */
export function SectionHeading({ title, meta, large = false }: SectionHeadingProps) {
  return (
    <header className="mb-12 flex items-end justify-between gap-6 md:mb-14">
      <h2 className={cn("font-display uppercase", large ? "text-section" : "text-heading")}>
        {large ? <LetterMask text={title} /> : <MaskLine>{title}</MaskLine>}
      </h2>
      {meta ? <div className="label shrink-0 pb-2 text-muted md:pb-3">{meta}</div> : null}
    </header>
  )
}
