import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google"

import { Cursor } from "@/components/layout/cursor"
import { Grain } from "@/components/layout/grain"
import { Header } from "@/components/layout/header"
import { Preloader } from "@/components/layout/preloader"
import { Providers } from "@/components/layout/providers"
import { Contact } from "@/components/sections/contact"
import { site } from "@/content/site"
import { cn } from "@/lib/cn"
import { PRELOADER_SCRIPT } from "@/lib/preloader-store"

import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below may add data-preloaded to <html> before React loads.
    <html
      lang="en"
      className={cn(bricolage.variable, instrument.variable, jetbrains.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Preloader />
          <Grain />
          <Cursor />
          <Header />
          {children}
          <Contact />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
