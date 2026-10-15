"use client"

import { ArrowDown } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { LiveClock } from "@/components/ui/live-clock"
import { TransitionLink } from "@/components/ui/transition-link"
import { site } from "@/content/site"
import { usePreloaded } from "@/hooks/use-preloaded"
import { DURATION, EASE_OUT, maskUp, staggerLetters } from "@/lib/motion"

export function Hero() {
  const ready = usePreloaded()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const words = site.name.toUpperCase().split(" ")
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: DURATION.slow, ease: EASE_OUT, delay },
  })

  return (
    <section
      id="top"
      ref={ref}
      className="gutter relative flex min-h-svh flex-col justify-end overflow-clip pt-32 pb-8 md:pb-10"
    >
      {/* Soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-accent/15 blur-[140px] md:size-[40rem]" />
        <div className="absolute bottom-0 -left-40 size-[24rem] rounded-full bg-paper/5 blur-[140px] md:size-[36rem]" />
      </div>

      <motion.div style={{ y, opacity }} className="container-page relative w-full">
        <motion.p className="label flex items-center gap-3 text-muted" {...fade(0)}>
          <span
            aria-hidden
            className={`size-2 rounded-full ${site.availability.open ? "animate-blink bg-accent" : "bg-faint"}`}
          />
          {site.availability.label}
        </motion.p>

        <motion.h1
          aria-label={site.name}
          className="mt-8 font-display text-hero uppercase"
          variants={staggerLetters}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {words.map((word) => (
            <span key={word} aria-hidden className="-mb-[0.04em] block overflow-hidden pb-[0.06em]">
              {word.split("").map((letter, index) => (
                <motion.span key={index} className="inline-block" variants={maskUp}>
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:items-end">
          <motion.div className="md:col-span-6" {...fade(0.7)}>
            <p className="label text-accent">{site.role}</p>
            <p className="mt-4 max-w-xl text-lead text-muted">{site.intro}</p>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end" {...fade(0.85)}>
            <TransitionLink
              href="/#work"
              className="group label inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 transition-colors hover:border-accent hover:text-accent"
            >
              See selected work
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" aria-hidden />
            </TransitionLink>
            <p className="label text-faint">
              {site.city}, {site.country} · <LiveClock timeZone={site.timezone} label="KHI" />
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
