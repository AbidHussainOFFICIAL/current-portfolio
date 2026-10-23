"use client"

import { ArrowDown, ArrowRight, Download } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { LiveClock } from "@/components/ui/live-clock"
import { TransitionLink } from "@/components/ui/transition-link"
import { useDictionary, useLocale, useSite } from "@/i18n/locale-provider"
import { usePreloaded } from "@/hooks/use-preloaded"
import { DURATION, EASE_OUT, maskUp, staggerLetters } from "@/lib/motion"

export function Hero() {
  const site = useSite()
  const dict = useDictionary()
  const locale = useLocale()
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
      className="gutter relative flex h-svh min-h-[34rem] flex-col overflow-clip pt-24 pb-6 md:pb-8"
    >
      {/* Brand mesh: three soft blooms of the accent, the quiet corner is bottom start, where the text sits. */}
      <div aria-hidden className="mesh pointer-events-none absolute inset-0" />

      <motion.div style={{ y, opacity }} className="container-page relative flex w-full flex-1 flex-col justify-between">
        <motion.div className="flex items-start justify-between gap-6" {...fade(0)}>
          <p className="label text-accent-small">{site.role}</p>
          <p className="label text-muted">
            <LiveClock timeZone={site.timezone} label={dict.common.clockCode} />
          </p>
        </motion.div>

        {/* The name is a link to Contact. Hovering swaps the two colours and slides an arrow in, as in the footer. */}
        <TransitionLink href="/#contact" data-cursor={dict.cursor.contact} className="group block select-none">
          <motion.h1
            aria-label={site.name}
            className="hero-name"
            variants={staggerLetters}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
          >
            {words.map((word, wordIndex) => (
              <span
                key={word}
                aria-hidden
                className={`-mb-[0.04em] flex items-center gap-[0.12em] overflow-hidden pb-[0.06em] transition-colors duration-500 ur:-my-[0.25em] ur:py-[0.25em] ${
                  wordIndex === 0
                    ? "text-fg group-hover:text-accent-text"
                    : "text-accent-text group-hover:text-fg"
                }`}
              >
                {/* Latin letters rise one by one. Urdu letters are joined, so each word rises as one piece. */}
                <span className="flex">
                  {(locale === "ur" ? [word] : word.split("")).map((unit, index) => (
                    <motion.span key={index} className="inline-block" variants={maskUp}>
                      {unit}
                    </motion.span>
                  ))}
                </span>
                {wordIndex === 0 ? (
                  <span className="inline-block overflow-hidden">
                    <ArrowRight
                      className="mirror size-[0.62em] translate-x-[calc(var(--dir)*-100%)] opacity-0 transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                ) : null}
              </span>
            ))}
          </motion.h1>
        </TransitionLink>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p className="max-w-xs text-lead text-muted md:col-span-6" {...fade(0.7)}>
            {site.intro}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end" {...fade(0.85)}>
            <TransitionLink href="/#work" className="group btn">
              {dict.hero.seeWork}
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" aria-hidden />
            </TransitionLink>
            <a href={site.cvUrl} download className="group btn">
              {dict.common.downloadCv}
              <Download className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
