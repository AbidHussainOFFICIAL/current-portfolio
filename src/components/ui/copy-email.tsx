"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { useDictionary } from "@/i18n/locale-provider"

interface CopyEmailProps {
  email: string
}

/** Button that copies the email address and confirms it. */
export function CopyEmail({ email }: CopyEmailProps) {
  const dict = useDictionary()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the mailto link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="label inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
    >
      {copied ? (
        <Check className="size-4 text-accent-small" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? dict.common.copied : dict.common.copyEmail}</span>
    </button>
  )
}
