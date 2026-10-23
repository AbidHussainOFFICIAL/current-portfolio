"use client"

import { ArrowLink } from "@/components/ui/arrow-link"
import { useDictionary } from "@/i18n/locale-provider"

export default function NotFound() {
  const dict = useDictionary()

  return (
    <main id="main" className="gutter container-page flex min-h-svh flex-col justify-center py-32">
      {/* React moves <title> into <head>. Next.js adds noindex to every 404 by itself. */}
      <title>{dict.notFound.metaTitle}</title>
      <p className="label text-accent-small">{dict.notFound.label}</p>
      <h1 className="mt-6 font-display text-section uppercase">{dict.notFound.title}</h1>
      <p className="mt-8 max-w-xs text-lead text-muted">{dict.notFound.text}</p>
      <ArrowLink href="/" className="mt-12">
        {dict.notFound.back}
      </ArrowLink>
    </main>
  )
}
