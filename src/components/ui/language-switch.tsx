"use client"

import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"

import { alternatePath, htmlLang, otherLocale } from "@/i18n/config"
import { useDictionary, useLocale } from "@/i18n/locale-provider"
import { cn } from "@/lib/cn"

/**
 * Switches the page to the other language and stays on the same page. It is a plain link, so the
 * whole document changes language (and direction) at once; a cross-document view transition fades it.
 */
export function LanguageSwitch() {
  const locale = useLocale()
  const dict = useDictionary()
  const pathname = usePathname()
  const target = otherLocale(locale)
  const href = alternatePath(pathname, target)

  return (
    <a
      href={href}
      hrefLang={htmlLang[target]}
      lang={htmlLang[target]}
      data-cursor=""
      aria-label={dict.preferences.switchLanguage}
      onClick={(event) => {
        // Keep the section the visitor is looking at: "/work#x" stays "#x" in the other language.
        const hash = window.location.hash
        if (hash) event.currentTarget.setAttribute("href", `${href}${hash}`)
      }}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 transition-colors hover:text-accent-small",
        // Urdu is set in the Arabic-script UI face on English pages; English keeps the label style on Urdu pages.
        target === "ur" ? "font-arabic text-small font-medium" : "label",
      )}
    >
      <Globe className="size-4" aria-hidden />
      {dict.preferences.languageName}
    </a>
  )
}
