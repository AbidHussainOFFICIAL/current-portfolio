import { MaskLine } from "@/components/ui/mask-line"

interface SectionHeadingProps {
  /** Section number such as "01". */
  index: string
  /** Small label beside the number. */
  label: string
  /** Large heading text. */
  title: string
  /** Optional content on the right of the label row. */
  aside?: React.ReactNode
}

export function SectionHeading({ index, label, title, aside }: SectionHeadingProps) {
  return (
    <header className="mb-14 md:mb-24">
      <div className="flex items-center justify-between gap-6 border-b border-line pb-4">
        <p className="label text-muted">
          <span className="text-accent">{index}</span> / {label}
        </p>
        {aside}
      </div>
      <h2 className="mt-10 font-display text-section uppercase">
        <MaskLine>{title}</MaskLine>
      </h2>
    </header>
  )
}
