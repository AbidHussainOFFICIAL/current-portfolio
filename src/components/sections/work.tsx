import { ArrowUpRight } from "lucide-react"

import { SplitScroll, type SplitScrollTile } from "@/components/sections/split-scroll"
import { WorksList, type WorkRow } from "@/components/sections/works-list"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getProjects } from "@/lib/content"
import { fmt, pad2 } from "@/lib/format"

/** Moves the first tile to the end, so neighbouring columns do not show the same project side by side. */
const rotate = (tiles: SplitScrollTile[]): SplitScrollTile[] => [...tiles.slice(1), ...tiles.slice(0, 1)]

export function Work({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const projects = getProjects(locale)

  const covers: SplitScrollTile[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  }))

  /** The n-th gallery picture of every project. */
  const shots = (n: number): SplitScrollTile[] =>
    projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      cover: project.gallery[n % project.gallery.length],
    }))

  // Twelve pictures from the three projects fill the two columns: six on each side.
  const left: SplitScrollTile[] = [...covers, ...shots(1)]
  const right: SplitScrollTile[] = [...rotate(shots(0)), ...rotate(shots(2))]

  // The list needs only what a row shows, so no code or long text travels to the browser.
  const rows: WorkRow[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    palette: project.palette,
    cover: project.cover,
  }))

  return (
    <section id="work" aria-label={dict.work.sectionLabel}>
      <SplitScroll left={left} right={right} titleLines={[dict.work.selectedFirst, dict.work.selectedSecond]} />

      <div className="pt-4 pb-[clamp(72px,9vw,144px)] md:pt-8">
        <div className="gutter container-page mb-8 flex items-center justify-between gap-6">
          <p className="label text-muted">{fmt(dict.common.projectsCount, { n: pad2(projects.length, locale) }, locale)}</p>
          <TransitionLink
            href="/work"
            className="label link-sweep tap inline-flex items-center gap-2 pb-1 text-muted hover:text-fg"
          >
            {dict.common.allProjects}
            <ArrowUpRight className="mirror size-4" aria-hidden />
          </TransitionLink>
        </div>

        <WorksList rows={rows} />
      </div>
    </section>
  )
}
