"use client"

import { Download } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { ClipReveal } from "@/components/ui/clip-reveal"
import { CountUp } from "@/components/ui/count-up"
import { CoverImage } from "@/components/ui/cover-image"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { site } from "@/content/site"

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "end 0.45"],
  })
  const words = site.about.statement.split(" ")

  return (
    <section id="about" className="border-t border-line">
      <div className="gutter container-page section-pad">
        <SectionHeading large title="About" meta={`${site.city}, ${site.country}`} />

        <p ref={statementRef} className="flex max-w-6xl flex-wrap gap-x-[0.28em] font-display text-statement">
          <span className="sr-only">{site.about.statement}</span>
          {words.map((word, index) => (
            <span key={index} aria-hidden>
              <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
                {word}
              </Word>
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-surface">
              <CoverImage cover={site.portrait} sizes="(min-width: 768px) 40vw, 100vw" />
            </ClipReveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <div className="flex flex-col gap-6 text-lead text-muted">
                {site.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <dl className="mt-12 border-t border-line">
                {site.about.meta.map((row) => (
                  <div key={row.label} className="flex justify-between gap-6 border-b border-line py-4">
                    <dt className="label text-muted">{row.label}</dt>
                    <dd className="text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <a href={site.cvUrl} download className="group btn mt-12">
                Download CV
                <Download className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The line sits outside the page gutter so it runs edge to edge. */}
      <div className="border-t border-line">
        <dl className="gutter container-page grid grid-cols-2 gap-x-6 gap-y-12 py-12 text-center md:grid-cols-4 md:py-16">
          {site.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="label order-2 mt-3 text-muted">{stat.label}</dt>
              <dd className="font-display text-numeral">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
