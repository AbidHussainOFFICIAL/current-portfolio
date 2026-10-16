import { readFile } from "node:fs/promises"
import path from "node:path"

import { codeToHtml } from "shiki"

import type { CodeSnippet } from "@/types/content"

/** The code to show: the inline text, or a real file from this repository read at build time. */
async function readSource(snippet: CodeSnippet): Promise<string> {
  if (snippet.code !== undefined) return snippet.code
  if (snippet.file) return readFile(path.join(process.cwd(), snippet.file), "utf8")
  throw new Error(`Snippet "${snippet.title}" needs either "code" or "file".`)
}

/** Highlighted HTML for a snippet. Runs on the server, so no highlighter is sent to the browser. */
export async function highlightSnippet(snippet: CodeSnippet): Promise<string> {
  const source = (await readSource(snippet)).replace(/\r\n/g, "\n").trimEnd()
  return codeToHtml(source, { lang: snippet.language, theme: "github-dark-default" })
}
