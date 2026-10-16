"use client"

import { ArrowDown, Download } from "lucide-react"
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
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
      className="gutter relative flex h-svh min-h-[34rem] flex-col overflow-clip pt-24 pb-6 md:pt-28 md:pb-8"
    >
      {/* Soft glows: radial gradients fade to nothing, so there is no visible edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 85% 0%, rgb(92 242 196 / 0.09), transparent 70%), radial-gradient(55% 50% at 0% 100%, rgb(236 235 230 / 0.05), transparent 70%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="container-page relative flex w-full flex-1 flex-col justify-between">
        <motion.div className="flex items-start justify-between gap-6" {...fade(0)}>
          <p className="label text-accent">( {site.role} )</p>
          <p className="label hidden text-muted sm:block">
            {site.city}, {site.country} · <LiveClock timeZone={site.timezone} label="KHI" />
          </p>
        </motion.div>

        <motion.h1
          aria-label={site.name}
          className="font-display text-[length:min(17vw,24svh)] leading-[0.82] font-extrabold tracking-[-0.04em] uppercase select-none"
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

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p className="max-w-md text-muted md:col-span-6 md:text-lg" {...fade(0.7)}>
            {site.intro}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end" {...fade(0.85)}>
            <TransitionLink href="/#work" className="group btn">
              See selected work
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" aria-hidden />
            </TransitionLink>
            <a href={site.cvUrl} download className="group btn">
              Download CV
              <Download className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
