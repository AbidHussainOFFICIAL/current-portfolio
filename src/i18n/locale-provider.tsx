"use client"

import { createContext, useContext, useMemo } from "react"

import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/dictionaries/en"
import type { SiteConfig } from "@/types/content"

interface LocaleContextValue {
  locale: Locale
  dict: Dictionary
  site: SiteConfig
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

interface LocaleProviderProps extends LocaleContextValue {
  children: React.ReactNode
}

/** Hands the language, the interface text and the site details to every client component. */
export function LocaleProvider({ locale, dict, site, children }: LocaleProviderProps) {
  const value = useMemo(() => ({ locale, dict, site }), [locale, dict, site])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) throw new Error("Locale hooks must be used inside LocaleProvider")
  return context
}

/** Language of the page: "en" or "ur". */
export function useLocale(): Locale {
  return useLocaleContext().locale
}

/** Interface text in the language of the page. */
export function useDictionary(): Dictionary {
  return useLocaleContext().dict
}

/** Site details (name, role, city, e-mail, socials ...) in the language of the page. */
export function useSite(): SiteConfig {
  return useLocaleContext().site
}
