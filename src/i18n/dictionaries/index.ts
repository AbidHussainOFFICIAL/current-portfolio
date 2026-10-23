import type { Locale } from "@/i18n/config"
import { en, type Dictionary } from "@/i18n/dictionaries/en"
import { ur } from "@/i18n/dictionaries/ur"

export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { en, ur }

/** The interface text for a language. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
