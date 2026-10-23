import type { Locale } from "@/i18n/config"

/** Urdu-Indic digits (U+06F0 to U+06F9), used for numbers in Urdu prose. */
const URDU_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const

/** Month names are written out here, so the result never depends on the ICU data of the server or the browser. */
const URDU_MONTHS = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر",
] as const

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

/**
 * Western digits to the digits of the page language. English text is returned unchanged.
 * Use it for numbers in prose only. Code, URLs, e-mail addresses, phone numbers and IDs stay Western.
 */
export function digits(value: string | number, locale: Locale): string {
  const text = String(value)
  if (locale !== "ur") return text
  return text.replace(/[0-9]/g, (digit) => URDU_DIGITS[Number(digit)])
}

/** 1 -> "01", 12 -> "12" (Urdu: "۰۱", "۱۲"). */
export function pad2(n: number, locale: Locale = "en"): string {
  return digits(String(n).padStart(2, "0"), locale)
}

/** "2026-09-12" -> "12 Sep 2026" (Urdu: "۱۲ ستمبر ۲۰۲۶"). Read in UTC, so server and browser always agree. */
export function formatDate(iso: string, locale: Locale = "en"): string {
  const date = new Date(iso)
  const day = String(date.getUTCDate()).padStart(2, "0")
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  if (locale === "ur") return `${digits(day, locale)} ${URDU_MONTHS[month]} ${digits(year, locale)}`
  return `${day} ${EN_MONTHS[month]} ${year}`
}

/**
 * Fills "{name}" holes in a dictionary string. Numbers are written with the digits of the language,
 * so fmt("{n} projects", { n: 3 }, "ur") gives "۳ پروجیکٹس"-style output.
 */
export function fmt(template: string, values: Record<string, string | number>, locale: Locale = "en"): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    if (!(key in values)) return match
    const value = values[key]
    return typeof value === "number" ? digits(value, locale) : value
  })
}
