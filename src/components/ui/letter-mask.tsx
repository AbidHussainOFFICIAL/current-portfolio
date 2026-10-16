"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/cn"
import { maskUp, staggerLetters, VIEWPORT_ONCE } from "@/lib/motion"

interface LetterMaskProps {
  text: string
  className?: string
}

/** A heading whose letters slide up one after another the first time it scrolls into view. */
export function LetterMask({ text, className }: LetterMaskProps) {
  return (
    <motion.span
      className={cn("flex", className)}
      variants={staggerLetters}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <span className="sr-only">{text}</span>
      {text.split("").map((letter, index) => (
        <span key={index} aria-hidden className="-mb-[0.08em] overflow-hidden pb-[0.08em]">
          <motion.span className="inline-block" variants={maskUp}>
            {letter === " " ? " " : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
