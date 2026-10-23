import { notFound } from "next/navigation"

import { About } from "@/components/sections/about"
import { Certificates } from "@/components/sections/certificates"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { ImageBreak } from "@/components/sections/image-break"
import { Marquee } from "@/components/sections/marquee"
import { Posts } from "@/components/sections/posts"
import { Services } from "@/components/sections/services"
import { Skills } from "@/components/sections/skills"
import { Testimonials } from "@/components/sections/testimonials"
import { Work } from "@/components/sections/work"
import { isLocale } from "@/i18n/config"
import { getServices, getTestimonials } from "@/lib/content"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <main id="main">
      <Hero />
      <Marquee locale={lang} />
      <Work locale={lang} />
      <About />
      <ImageBreak />
      <Services services={getServices(lang)} />
      <Experience locale={lang} />
      <Certificates locale={lang} />
      <Skills locale={lang} />
      <Testimonials testimonials={getTestimonials(lang)} />
      <Posts locale={lang} />
    </main>
  )
}
