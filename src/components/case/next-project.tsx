import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

/** Full-bleed link to the next project (Noir): its picture behind a dark veil, with a huge title. */
export function NextProject({ project }: { project: Project }) {
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      data-cursor="Next"
      className="group relative block h-svh min-h-[28rem] overflow-hidden bg-ink"
    >
      {/* Only transform and opacity animate, so the zoom and the brightening stay smooth. */}
      <div className="absolute inset-0 scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform group-hover:scale-[1.06]">
        <CoverImage cover={project.cover} sizes="100vw" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-ink opacity-60 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-35"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="label text-paper/70">Next project</span>
        <span className="mt-6 block max-w-[14ch] font-display text-[length:clamp(3rem,10vw,10rem)] leading-[0.88] font-extrabold tracking-tighter text-paper uppercase">
          {project.title}
        </span>
        <span className="label mt-8 text-paper/70">
          {project.category} — {project.year}
        </span>
      </div>
    </TransitionLink>
  )
}
