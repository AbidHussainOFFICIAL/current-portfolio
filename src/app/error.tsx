"use client"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="gutter container-page flex min-h-svh flex-col justify-center py-32">
      <p className="label text-accent">Something went wrong</p>
      <h1 className="mt-6 font-display text-section uppercase">Unexpected error</h1>
      <p className="mt-8 max-w-md text-lead text-muted">
        The page failed to load. You can try again, and if it keeps happening please come back later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="label mt-12 w-fit rounded-full border border-line px-6 py-3 transition-colors hover:border-accent hover:text-accent"
      >
        Try again
      </button>
    </main>
  )
}
