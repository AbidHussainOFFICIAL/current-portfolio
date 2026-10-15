import { PinnedGallery } from "@/components/sections/pinned-gallery"
import { ProjectIndex } from "@/components/sections/project-index"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProjectCard } from "@/components/ui/project-card"
import { allProjects, featuredProjects } from "@/lib/content"
import { pad2 } from "@/lib/format"

export function Work() {
  return (
    <section id="work" className="section-pad">
      <div className="gutter container-page">
        <SectionHeading
          index="01"
          label="Work"
          title="Selected Work"
          aside={<p className="label text-muted">{pad2(featuredProjects.length)} featured</p>}
        />

        {/* Desktop: pinned two-column gallery */}
        <PinnedGallery projects={featuredProjects} />

        {/* Phones and tablets: simple stacked cards */}
        <ul className="flex flex-col gap-14 lg:hidden">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <Reveal>
                <ProjectCard project={project} sizes="100vw" />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-24 md:mt-40">
          <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
            <h3 className="label text-muted">Project index</h3>
            <p className="label text-faint">{pad2(allProjects.length)} projects</p>
          </div>
          <ProjectIndex projects={allProjects} />
        </div>

        <div className="mt-14 flex justify-end">
          <ArrowLink href="/work">View all work</ArrowLink>
        </div>
      </div>
    </section>
  )
}
