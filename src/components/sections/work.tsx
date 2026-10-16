import { SplitScroll, type SplitScrollTile } from "@/components/sections/split-scroll"
import { WorksList } from "@/components/sections/works-list"
import { allProjects } from "@/lib/content"
import { TransitionLink } from "@/components/ui/transition-link"

/** Each project contributes its cover to the left column and its first detail shot to the right. */
const left: SplitScrollTile[] = allProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  cover: project.cover,
}))

const right: SplitScrollTile[] = allProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  cover: project.gallery[0].cover,
}))

export function Work() {
  return (
    <section id="work" aria-label="Work">
      <SplitScroll left={left} right={right} />

      <div className="section-pad">
        <div className="gutter container-page mb-12 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="font-display text-heading uppercase">Projects</h2>
          <TransitionLink
            href="/work"
            className="label link-sweep hidden pb-1 text-muted hover:text-paper md:block"
          >
            All projects ↗
          </TransitionLink>
        </div>

        <WorksList projects={allProjects} />

        <div className="gutter container-page mt-8 md:hidden">
          <TransitionLink href="/work" className="label link-sweep pb-1 text-muted">
            All projects ↗
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
