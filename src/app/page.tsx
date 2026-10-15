import { About } from "@/components/sections/about"
import { Certificates } from "@/components/sections/certificates"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { JournalPreview } from "@/components/sections/journal-preview"
import { Marquee } from "@/components/sections/marquee"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { Work } from "@/components/sections/work"

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
      <Experience />
      <Certificates />
      <Testimonials />
      <JournalPreview />
    </main>
  )
}
