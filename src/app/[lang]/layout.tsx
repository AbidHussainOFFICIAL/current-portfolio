import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
  Noto_Sans_Arabic,
} from "next/font/google"
import { notFound } from "next/navigation"

import { Cursor } from "@/components/layout/cursor"
import { Grain } from "@/components/layout/grain"
import { Header } from "@/components/layout/header"
import { Preloader } from "@/components/layout/preloader"
import { Providers } from "@/components/layout/providers"
import { SiteFooter } from "@/components/layout/site-footer"
import { Contact } from "@/components/sections/contact"
import { site as base } from "@/content/site"
import { direction, htmlLang, isLocale, localePath, locales, ogLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { LocaleProvider } from "@/i18n/locale-provider"
import { cn } from "@/lib/cn"
import { getSite } from "@/lib/content"
import { PRELOADER_SCRIPT } from "@/lib/preloader-store"
import { THEME_SCRIPT } from "@/lib/theme"

import "../globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

// The two Urdu faces are not preloaded: English pages never need them (the browser fetches a face only
// when a character on the page uses it, and the language switch label uses Noto Sans Arabic).
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
  preload: false,
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: false,
})

type LayoutParams = { lang: string }

export function generateStaticParams(): LayoutParams[] {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<LayoutParams> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const site = getSite(lang)
  const title = `${site.name} — ${site.role}`

  const languages: Record<string, string> = {}
  for (const code of locales) languages[code] = localePath(code, "/")
  languages["x-default"] = localePath("en", "/")

  return {
    metadataBase: new URL(base.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: site.description,
    authors: [{ name: site.name }],
    alternates: {
      canonical: localePath(lang, "/"),
      languages,
      types: { "application/rss+xml": lang === "en" ? "/feed.xml" : `/${lang}/feed.xml` },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: site.description,
      url: localePath(lang, "/"),
      locale: ogLocale[lang],
      alternateLocale: locales.filter((code) => code !== lang).map((code) => ogLocale[code]),
    },
    twitter: { card: "summary_large_image", title, description: site.description },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
    { media: "(prefers-color-scheme: light)", color: "#F6F6F4" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<LayoutParams>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const site = getSite(lang)

  return (
    // suppressHydrationWarning: the inline scripts below add data-preloaded and data-theme to <html> before React loads.
    <html
      lang={htmlLang[lang]}
      dir={direction(lang)}
      className={cn(
        bricolage.variable,
        instrument.variable,
        jetbrains.variable,
        nastaliq.variable,
        notoArabic.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <LocaleProvider locale={lang} dict={dict} site={site}>
          <Providers>
            <Preloader />
            <Grain />
            <Cursor />
            <Header />
            {children}
            <SiteFooter>
              <Contact locale={lang} />
            </SiteFooter>
          </Providers>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
