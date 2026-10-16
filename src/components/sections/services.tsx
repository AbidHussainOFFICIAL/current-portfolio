"use client"

import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { SectionHeading } from "@/components/ui/section-heading"
import { services } from "@/content/services"
import { cn } from "@/lib/cn"
import { pad2 } from "@/lib/format"
import { DURATION, EASE_OUT } from "@/lib/motion"

/** The title shrinks and the panel opens on one clock, so the two always move together. */
const PANEL = { duration: DURATION.base, ease: EASE_OUT }

/** Size of an open title compared with a closed one. */
const OPEN_SCALE = 0.62

export function Services() {
  // Only one panel is open at a time. The first one starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="services" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading title="Services" meta={`${pad2(services.length)} services`} />
      </div>

      <ul className="border-t border-line">
        {services.map((service, index) => {
          const open = openIndex === index
          return (
            <li key={service.index} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={`service-button-${index}`}
                  aria-expanded={open}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group gutter container-page flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                >
                  <span className="flex items-baseline gap-5 md:gap-10">
                    <span
                      className={cn(
                        "label w-8 shrink-0 transition-colors duration-500 md:w-12",
                        open ? "text-accent" : "text-faint",
                      )}
                    >
                      {service.index}
                    </span>
                    {/* Outer span: hover nudge (CSS). Inner span: open and close scale (motion, transform only). */}
                    <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:group-hover:translate-x-3">
                      <motion.span
                        className={cn(
                          "inline-block origin-left font-display text-row uppercase transition-colors duration-500",
                          open ? "text-accent" : "group-hover:text-accent",
                        )}
                        initial={false}
                        animate={{ scale: open ? OPEN_SCALE : 1 }}
                        transition={PANEL}
                      >
                        {service.name}
                      </motion.span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-ui border transition-colors duration-500 md:size-12",
                      open ? "border-accent bg-accent text-ink" : "border-line",
                    )}
                  >
                    <Plus
                      className={cn("size-5 transition-transform duration-500 ease-out-expo", open && "rotate-45")}
                      aria-hidden
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={`service-panel-${index}`}
                    role="region"
                    aria-labelledby={`service-button-${index}`}
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={PANEL}
                  >
                    <div className="gutter container-page grid gap-8 pb-10 pl-[3.25rem] md:grid-cols-12 md:pb-14 md:pl-[7.5rem]">
                      {/* The text arrives after the panel has started to open. */}
                      <motion.p
                        className="max-w-xl text-lead text-muted md:col-span-7"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0, transition: { ...PANEL, delay: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      >
                        {service.description}
                      </motion.p>
                      <motion.ul
                        className="flex flex-wrap content-start gap-2 md:col-span-5"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0, transition: { ...PANEL, delay: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      >
                        {service.tags.map((tag) => (
                          <li key={tag} className="tag">
                            {tag}
                          </li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
