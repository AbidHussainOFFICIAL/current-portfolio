import { MaskLine } from "@/components/ui/mask-line"

interface SectionHeadingProps {
  title: string
  /** Small mono label above the title, shown as "( Label )". */
  label?: string
  /** Optional content on the right, such as a link to the full page. */
  aside?: React.ReactNode
}

/** Bold uppercase section title with an optional label and a right-hand aside. */
export function SectionHeading({ title, label, aside }: SectionHeadingProps) {
  return (
    <header className="mb-12 flex items-end justify-between gap-6 md:mb-14">
      <div>
        {label ? <p className="label mb-6 text-accent">( {label} )</p> : null}
        <h2 className="font-display text-heading uppercase">
          <MaskLine>{title}</MaskLine>
        </h2>
      </div>
      {aside}
    </header>
  )
}
