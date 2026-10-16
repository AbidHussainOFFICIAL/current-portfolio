"use client"

import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

import { site } from "@/content/site"
import { EASE_OUT } from "@/lib/motion"

/** Full-screen parallax picture with a large quote over it. */
export function ImageBreak() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15])

  return (
    <section ref={ref} aria-label={site.quote.label} className="relative h-[80svh] overflow-hidden border-t border-line md:h-svh">
      <motion.div style={{ y, scale }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        {/* DUMMY image: replace /public/images/parallax.jpg with your own picture. */}
        <Image src="/images/parallax.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="label mb-6 text-paper/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {site.quote.label}
        </motion.p>

        <motion.blockquote
          className="max-w-4xl font-display text-3xl leading-tight font-bold tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          &ldquo;
          {site.quote.lines.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
          &rdquo;
        </motion.blockquote>

        <motion.p
          className="label mt-8 text-paper/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          — {site.quote.by}
        </motion.p>
      </div>
    </section>
  )
}
