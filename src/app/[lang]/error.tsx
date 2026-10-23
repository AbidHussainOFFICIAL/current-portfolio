"use client"

import { useDictionary } from "@/i18n/locale-provider"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const dict = useDictionary()

  return (
    <main id="main" className="gutter container-page flex min-h-svh flex-col justify-center py-32">
      <p className="label text-accent-small">{dict.error.label}</p>
      <h1 className="mt-6 font-display text-section uppercase">{dict.error.title}</h1>
      <p className="mt-8 max-w-xs text-lead text-muted">{dict.error.text}</p>
      <button type="button" onClick={reset} className="btn mt-12 w-fit">
        {dict.error.retry}
      </button>
    </main>
  )
}
