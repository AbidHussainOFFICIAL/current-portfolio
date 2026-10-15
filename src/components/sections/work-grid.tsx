"use client"

import { useState } from "react"

import { ProjectCard } from "@/components/ui/project-card"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/cn"
import type { Project } from "@/types/content"

interface WorkGridProps {
  projects: Project[]
}

const ALL = "All"

/** Filterable grid of every project, used on the All Work page. */
export function WorkGrid({ projects }: WorkGridProps) {
  const [category, setCategory] = useState(ALL)
  const categories = [ALL, ...Array.from(new Set(projects.map((project) => project.category)))]
  const visible = category === ALL ? projects : projects.filter((project) => project.category === category)

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              "label rounded-full border px-4 py-2 transition-colors",
              category === item
                ? "border-accent bg-accent text-ink"
                : "border-line text-muted hover:border-paper hover:text-paper",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {visible.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={(index % 2) * 0.1}>
              <ProjectCard
                project={project}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={index < 2}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
