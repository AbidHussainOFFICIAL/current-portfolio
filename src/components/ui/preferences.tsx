import { LanguageSwitch } from "@/components/ui/language-switch"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/cn"

/** Language and theme controls. Used in the header and at the foot of the menu. */
export function Preferences({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <LanguageSwitch />
      <ThemeToggle />
    </div>
  )
}
