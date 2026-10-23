/**
 * Languages of the site. English is the default and lives at clean URLs ("/work");
 * Urdu lives under "/ur" ("/ur/work"). src/proxy.ts maps the clean URLs onto the "[lang]" folder.
 */
export const locales = ["en", "ur"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Reading direction of a language. */
export function direction(locale: Locale): "ltr" | "rtl" {
  return locale === "ur" ? "rtl" : "ltr"
}

/** BCP 47 tag used for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = { en: "en", ur: "ur" }

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { en: "en_US", ur: "ur_PK" }

/** Name of each language written in that language, for the language switch. */
export const languageName: Record<Locale, string> = { en: "English", ur: "اردو" }

/** The language a visitor can switch to from the given one. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ur" : "en"
}

/** True for links that leave the site or are not paths (mailto:, https://, #hash only). */
function isExternal(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//") || href.startsWith("#")
}

/**
 * Puts a language in front of a site path.
 * English stays clean: localePath("en", "/work") is "/work". Urdu gets the prefix: "/ur/work".
 * Hashes survive: localePath("ur", "/#about") is "/ur#about", and the home page is "/ur".
 */
export function localePath(locale: Locale, href: string): string {
  if (isExternal(href)) return href
  const named = /^\/(en|ur)(?=$|[/?#])/.test(href)
  const { locale: found, path } = splitLocale(href)
  const target = named ? found : locale
  if (target === defaultLocale) return path
  if (path === "/") return `/${target}`
  // "/#about" -> "/ur#about", "/work" -> "/ur/work"
  return path.startsWith("/#") || path.startsWith("/?") ? `/${target}${path.slice(1)}` : `/${target}${path}`
}

/**
 * Splits a path (with optional ?query and #hash) into its language and the language-free path.
 * "/ur/work#x" -> { locale: "ur", path: "/work#x" }. "/work" -> { locale: "en", path: "/work" }.
 * A leading "/en" is removed too, because the proxy rewrites clean URLs onto "/en/...".
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = /^\/(en|ur)(?=$|[/?#])/.exec(pathname)
  if (!match) return { locale: defaultLocale, path: pathname || "/" }
  const rest = pathname.slice(match[0].length)
  const path = rest === "" ? "/" : rest.startsWith("/") ? rest : `/${rest}`
  return { locale: match[1] as Locale, path }
}

/** The same page in another language: alternatePath("/ur/work", "en") is "/work". */
export function alternatePath(pathname: string, target: Locale): string {
  const { path } = splitLocale(pathname)
  return localePath(target, path)
}
