"use client"

import { motion } from "motion/react"

import { useLocale } from "@/i18n/locale-provider"
import { cn } from "@/lib/cn"
import { maskUp, staggerLetters, VIEWPORT_ONCE } from "@/lib/motion"

interface LetterMaskProps {
  text: string
  className?: string
}

/**
 * A heading whose letters slide up one after another the first time it scrolls into view.
 * Urdu letters are joined, so an Urdu heading moves word by word instead.
 */
export function LetterMask({ text, className }: LetterMaskProps) {
  const locale = useLocale()
  const joined = locale === "ur"
  const units = joined ? text.split(" ") : text.split("")

  return (
    <motion.span
      className={cn("flex", joined && "flex-wrap gap-x-[0.25em]", className)}
      variants={staggerLetters}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <span className="sr-only">{text}</span>
      {units.map((unit, index) => (
        <span
          key={index}
          aria-hidden
          className="-mb-[0.08em] overflow-hidden pb-[0.08em] ur:-my-[0.3em] ur:py-[0.3em]"
        >
          <motion.span className="inline-block" variants={maskUp}>
            {unit === " " ? " " : unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
