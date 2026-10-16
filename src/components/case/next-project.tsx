import { CoverImage } from "@/components/ui/cover-image"
import { TransitionLink } from "@/components/ui/transition-link"
import type { Project } from "@/types/content"

/** Full-bleed link to the next project (Noir): its picture behind a dark veil, with a huge title. */
export function NextProject({ project }: { project: Project }) {
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      data-cursor="Next"
      className="group relative block h-[85svh] min-h-[28rem] overflow-hidden border-t border-line bg-ink"
    >
      <div className="absolute inset-0 brightness-[0.4] transition-[transform,filter] duration-1000 ease-out-expo group-hover:scale-105 group-hover:brightness-[0.65]">
        <CoverImage cover={project.cover} sizes="100vw" />
      </div>

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
