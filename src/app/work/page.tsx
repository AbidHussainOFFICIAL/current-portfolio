import type { Metadata } from "next"

import { WorkGrid } from "@/components/sections/work-grid"
import { MaskLine } from "@/components/ui/mask-line"
import { allProjects } from "@/lib/content"
import { pad2 } from "@/lib/format"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected websites, web apps and design systems, with a case study for each.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Work" },
}

export default function WorkPage() {
  return (
    <main id="main" className="gutter container-page pt-32 pb-24 md:pt-44 md:pb-40">
      <header className="mb-14 md:mb-24">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="label text-muted">All work</p>
          <p className="label text-faint">{pad2(allProjects.length)} projects</p>
        </div>
        <h1 className="mt-10 font-display text-section uppercase">
          <MaskLine immediate>Work</MaskLine>
        </h1>
        <p className="mt-8 max-w-xl text-lead text-muted">
          Websites, web apps and design systems for founders, studios and teams. Open any project for the full case
          study.
        </p>
      </header>

      <WorkGrid projects={allProjects} />
    </main>
  )
}
