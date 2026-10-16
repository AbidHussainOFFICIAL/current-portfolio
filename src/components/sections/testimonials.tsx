"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { testimonials } from "@/content/testimonials"
import { pad2 } from "@/lib/format"
import { DURATION, EASE_OUT } from "@/lib/motion"

/** One large quote at a time. Renders nothing until real testimonials are added. */
export function Testimonials() {
  const [index, setIndex] = useState(0)

  if (testimonials.length === 0) return null

  const item = testimonials[index]
  const step = (direction: 1 | -1) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  return (
    <section aria-label="Kind words" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="label mb-6 text-accent">( Kind words )</p>
            <h2 className="font-display text-heading uppercase">Kind words</h2>
          </div>
          <p className="label text-muted">
            <span className="text-paper">{pad2(index + 1)}</span> / {pad2(testimonials.length)}
          </p>
        </div>

        <div className="relative grid gap-10 md:grid-cols-12">
          <span
            aria-hidden
            className="pointer-events-none font-display text-[8rem] leading-[0.7] font-extrabold text-accent md:col-span-2 md:text-[14rem]"
          >
            &ldquo;
          </span>

          <div className="md:col-span-10">
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

            {testimonials.length > 1 ? (
              <div className="mt-12 flex gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="btn px-4"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} className="btn px-4" aria-label="Next testimonial">
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
