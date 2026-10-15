"use client"

import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { SectionHeading } from "@/components/ui/section-heading"
import { services } from "@/content/services"
import { cn } from "@/lib/cn"
import { DURATION, EASE_OUT } from "@/lib/motion"

export function Services() {
  // Only one panel is open at a time. The first one starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="services" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <SectionHeading index="03" label="Services" title="Services" />

        <ul className="border-b border-line">
          {services.map((service, index) => {
            const open = openIndex === index
            return (
              <li key={service.index} className="border-t border-line">
                <h3>
                  <button
                    type="button"
                    id={`service-button-${index}`}
                    aria-expanded={open}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="group flex w-full items-baseline gap-5 py-7 text-left md:gap-10 md:py-10"
                  >
                    <span className="label w-8 shrink-0 text-faint md:w-12">{service.index}</span>
                    <span
                      className={cn(
                        "flex-1 font-display text-row uppercase transition-colors duration-500 group-hover:text-accent",
                        open && "text-accent",
                      )}
                    >
                      {service.name}
                    </span>
                    <Plus
                      className={cn("size-6 shrink-0 transition-transform duration-500", open && "rotate-45")}
                      aria-hidden
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`service-panel-${index}`}
                      role="region"
                      aria-labelledby={`service-button-${index}`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.base, ease: EASE_OUT }}
                    >
                      <div className="grid gap-8 pb-10 pl-13 md:grid-cols-12 md:pb-14 md:pl-22">
                        <p className="max-w-xl text-lead text-muted md:col-span-7">{service.description}</p>
                        <ul className="flex flex-wrap content-start gap-2 md:col-span-5">
                          {service.tags.map((tag) => (
                            <li key={tag} className="label rounded-full border border-line px-3 py-1.5 text-muted">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
