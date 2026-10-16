"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { SectionHeading } from "@/components/ui/section-heading"
import { testimonials } from "@/content/testimonials"
import { pad2 } from "@/lib/format"
import { DURATION, EASE_OUT } from "@/lib/motion"

/** One large quote at a time, with the counter and the arrows on the heading line. */
export function Testimonials() {
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const item = testimonials[index]
  const step = (direction: 1 | -1) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  return (
    <section aria-label="Kind words" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading
          title="Kind words"
          meta={
            <span className="flex items-center gap-5">
              <span>
                <span className="text-paper">{pad2(index + 1)}</span> / {pad2(testimonials.length)}
              </span>
              {testimonials.length > 1 ? (
                <span className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="btn px-3 py-2"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="btn px-3 py-2"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </span>
              ) : null}
            </span>
          }
        />

        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <span
            aria-hidden
            className="pointer-events-none font-display text-[8rem] leading-[0.7] font-extrabold text-accent md:col-span-2 md:text-[14rem]"
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
                  <span aria-hidden className="h-px w-10 bg-accent" />
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
