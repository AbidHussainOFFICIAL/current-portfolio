import type { Metadata } from "next"

import { ArrowLink } from "@/components/ui/arrow-link"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <main id="main" className="gutter container-page flex min-h-svh flex-col justify-center py-32">
      <p className="label text-accent">Error 404</p>
      <h1 className="mt-6 font-display text-section uppercase">Page not found</h1>
      <p className="mt-8 max-w-md text-lead text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <ArrowLink href="/" className="mt-12">
        Back to home
      </ArrowLink>
    </main>
  )
}
