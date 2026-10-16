import { highlightSnippet } from "@/lib/highlight"
import type { CodeSnippet } from "@/types/content"

/** A highlighted code excerpt with a file name header. Highlighting happens on the server. */
export async function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const html = await highlightSnippet(snippet)

  return (
    <figure className="overflow-hidden rounded-ui border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
        <span className="label truncate text-muted">{snippet.filename}</span>
        <span className="flex shrink-0 items-center gap-3">
          {snippet.dummy ? <span className="tag border-accent/40 text-accent">Placeholder code</span> : null}
          <span className="label text-faint">{snippet.language}</span>
        </span>
      </figcaption>
      {/* The HTML comes from shiki, run on code written in this repository. */}
      <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )
}
