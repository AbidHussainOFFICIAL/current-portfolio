import { SplitScroll, type SplitScrollTile } from "@/components/sections/split-scroll"
import { WorksList } from "@/components/sections/works-list"
import { TransitionLink } from "@/components/ui/transition-link"
import { allProjects } from "@/lib/content"
import { pad2 } from "@/lib/format"

const covers: SplitScrollTile[] = allProjects.map((project) => ({
  slug: project.slug,
  title: project.title,
  cover: project.cover,
}))

/** The n-th gallery picture of every project. */
const shots = (n: number): SplitScrollTile[] =>
  allProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
    cover: project.gallery[n % project.gallery.length],
  }))

/** Moves the first tile to the end, so neighbouring columns do not show the same project side by side. */
const rotate = (tiles: SplitScrollTile[]): SplitScrollTile[] => [...tiles.slice(1), ...tiles.slice(0, 1)]

// Twelve pictures from the three projects fill the two columns: six on each side.
const left: SplitScrollTile[] = [...covers, ...shots(1)]
const right: SplitScrollTile[] = [...rotate(shots(0)), ...rotate(shots(2))]

export function Work() {
  return (
    <section id="work" aria-label="Selected works">
      <SplitScroll left={left} right={right} />

      <div className="pt-4 pb-[clamp(72px,9vw,144px)] md:pt-8">
        <div className="gutter container-page mb-8 flex items-center justify-between gap-6">
          <p className="label text-muted">{pad2(allProjects.length)} projects</p>
          <TransitionLink href="/work" className="label link-sweep pb-1 text-muted hover:text-paper">
            All projects ↗
          </TransitionLink>
        </div>

        <WorksList projects={allProjects} />
      </div>
    </section>
  )
}
