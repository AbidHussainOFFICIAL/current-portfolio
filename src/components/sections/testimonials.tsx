import { Reveal } from "@/components/ui/reveal"
import { testimonials } from "@/content/testimonials"

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="section-pad border-t border-line">
      <div className="gutter container-page">
        <p className="label mb-14 text-muted md:mb-20">Kind words</p>

        <ul className="grid gap-14 md:grid-cols-3 md:gap-10">
          {testimonials.map((item, index) => (
            <li key={item.author}>
              <Reveal delay={index * 0.1}>
                <figure>
                  <blockquote className="text-xl leading-snug font-medium md:text-2xl">
                    &ldquo;{item.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 border-t border-line pt-4">
                    <p className="font-display text-lg font-bold">{item.author}</p>
                    <p className="label mt-1 text-muted">{item.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
