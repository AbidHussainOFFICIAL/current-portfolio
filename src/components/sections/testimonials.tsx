"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { SectionHeading } from "@/components/ui/section-heading"
import { useDictionary, useLocale } from "@/i18n/locale-provider"
import { pad2 } from "@/lib/format"
import { DURATION, EASE_OUT } from "@/lib/motion"
import type { Testimonial } from "@/types/content"

/** One large quote at a time, with the counter and the arrows on the heading line. */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const dict = useDictionary()
  const locale = useLocale()
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const item = testimonials[index]
  const step = (direction: 1 | -1) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  const arrowButton = "icon-btn border border-line-strong transition-colors hover:border-accent-line hover:text-accent-small"

  return (
    <section aria-label={dict.testimonials.title} className="section-pad">
      <div className="gutter container-page">
        <SectionHeading
          title={dict.testimonials.title}
          meta={
            <span className="flex items-center gap-5">
              <span>
                <span className="text-fg">{pad2(index + 1, locale)}</span> / {pad2(testimonials.length, locale)}
              </span>
              {testimonials.length > 1 ? (
                <span className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} className={arrowButton} aria-label={dict.testimonials.previous}>
                    <ArrowLeft className="mirror size-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => step(1)} className={arrowButton} aria-label={dict.testimonials.next}>
                    <ArrowRight className="mirror size-4" aria-hidden />
                  </button>
                </span>
              ) : null}
            </span>
          }
        />

        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <span
            aria-hidden
            className="pointer-events-none font-display text-[8rem] leading-[0.7] font-extrabold text-accent-text md:col-span-2 md:text-[14rem]"
          >
            &ldquo;
          </span>

          <div className="min-h-[18rem] md:col-span-10 md:min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              >
                <blockquote className="font-display text-statement">{item.text}</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span aria-hidden className="h-px w-10 bg-accent-line" />
                  <span>
                    <span className="block font-display text-lg font-bold">{item.author}</span>
                    <span className="label mt-1 block text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
