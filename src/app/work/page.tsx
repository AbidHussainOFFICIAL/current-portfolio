import type { Metadata } from "next"

import { ProjectCard } from "@/components/ui/project-card"
import { Reveal } from "@/components/ui/reveal"
import { allProjects } from "@/lib/content"
import { pad2 } from "@/lib/format"

export const metadata: Metadata = {
  title: "All Projects",
  description: "Websites and web apps I have built, with a page for each project.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "All Projects" },
}

export default function WorkPage() {
  return (
    <main id="main" className="gutter container-page pt-32 pb-24 md:pt-40 md:pb-32">
      <header className="mb-14 flex items-end justify-between gap-6">
        <h1 className="font-display text-6xl font-extrabold tracking-tighter uppercase md:text-8xl">
          All Projects
        </h1>
        <p className="label pb-2 text-muted md:pb-3">{pad2(allProjects.length)} projects</p>
      </header>

      <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {allProjects.map((project, index) => (
          <li key={project.slug} className={index % 2 === 1 ? "md:mt-24" : undefined}>
            <Reveal delay={(index % 2) * 0.1}>
              <ProjectCard project={project} sizes="(min-width: 768px) 50vw, 100vw" priority={index < 2} />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
