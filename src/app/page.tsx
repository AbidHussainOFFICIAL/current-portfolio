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

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Work />
      <About />
      <ImageBreak />
      <Services />
      <Experience />
      <Certificates />
      <Skills />
      <Testimonials />
      <Posts />
    </main>
  )
}
