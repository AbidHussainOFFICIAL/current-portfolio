import { ArrowUpRight } from "lucide-react"

import { CodeBlock } from "@/components/case/code-block"
import { ParallaxFrame } from "@/components/case/parallax-frame"
import { ClipReveal } from "@/components/ui/clip-reveal"
import { Reveal } from "@/components/ui/reveal"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { digits, fmt, pad2 } from "@/lib/format"
import type { Project } from "@/types/content"

/** The wide frame sits inside the page gutter, so the picture is a little narrower than the screen. */
const FRAME_SIZES = "(min-width: 1280px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 5rem), calc(100vw - 3rem)"

/** Title at the start of the line, a small meta at the end. */
function CaseHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <header className="mb-10 flex items-end justify-between gap-6 md:mb-14">
      <h2 className="font-display text-title uppercase">{title}</h2>
      <p className="label shrink-0 pb-1 text-muted">{meta}</p>
    </header>
  )
}

/** A block with the page gutter: heading, then content. */
function CaseSection({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="section-pad">
      <div className="gutter container-page">
        <CaseHeading title={title} meta={meta} />
        {children}
      </div>
    </section>
  )
}

/** Numbered rows with a line under each one, running edge to edge. */
function Ledger({ items, locale }: { items: React.ReactNode[]; locale: Locale }) {
  return (
    <ol className="border-t border-line">
      {items.map((item, index) => (
        <li key={index} className="border-b border-line">
          <Reveal>
            <div className="gutter container-page grid items-baseline gap-3 py-6 md:grid-cols-[4rem_1fr] md:gap-8 md:py-8">
              <span className="label text-faint">{pad2(index + 1, locale)}</span>
              {item}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

/** A block whose heading has the page gutter and whose rows run edge to edge. */
function LedgerSection({
  title,
  meta,
  items,
  locale,
}: {
  title: string
  meta: string
  items: React.ReactNode[]
  locale: Locale
}) {
  return (
    <section aria-label={title} className="section-pad">
      <div className="gutter container-page">
        <CaseHeading title={title} meta={meta} />
      </div>
      <Ledger items={items} locale={locale} />
    </section>
  )
}

export function CaseContent({ project, locale }: { project: Project; locale: Locale }) {
  const dict = getDictionary(locale)
  const [wide, ...rest] = project.gallery
  const link = "link-sweep tap inline-flex items-center gap-2 pb-1 hover:text-accent-small"
  const row = "flex justify-between gap-6 border-b border-line py-4"
  const fileCount = project.snippets.length

  return (
    <div className="mt-20 md:mt-32">
      <CaseSection title={dict.case.brief} meta={pad2(1, locale)}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-display text-statement">{project.summary}</p>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line">
              <div className={row}>
                <dt className="label text-muted">{dict.case.role}</dt>
                <dd className="text-end">{project.role}</dd>
              </div>
              <div className={row}>
                <dt className="label text-muted">{dict.case.year}</dt>
                <dd>{digits(project.year, locale)}</dd>
              </div>
              <div className={row}>
                <dt className="label text-muted">{dict.case.type}</dt>
                <dd className="text-end">{project.category}</dd>
              </div>
              <div className={row}>
                <dt className="label text-muted">{dict.case.stack}</dt>
                <dd className="flex flex-wrap justify-end gap-2" dir="ltr">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              {project.links?.live ? (
                <div className={row}>
                  <dt className="label text-muted">{dict.case.live}</dt>
                  <dd>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={link}>
                      {dict.case.visitSite}
                      <ArrowUpRight className="mirror size-4" aria-hidden />
                      <span className="sr-only">{dict.common.opensInNewTab}</span>
                    </a>
                  </dd>
                </div>
              ) : null}
              {project.links?.repo ? (
                <div className={row}>
                  <dt className="label text-muted">{dict.case.source}</dt>
                  <dd>
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={link}>
                      {dict.case.github}
                      <ArrowUpRight className="mirror size-4" aria-hidden />
                      <span className="sr-only">{dict.common.opensInNewTab}</span>
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </CaseSection>

      <LedgerSection
        title={dict.case.features}
        meta={fmt(dict.case.itemsCount, { n: pad2(project.features.length, locale) }, locale)}
        locale={locale}
        items={project.features.map((feature) => (
          <p key={feature} className="max-w-md text-xl font-medium md:text-2xl">
            {feature}
          </p>
        ))}
      />

      <div className="gutter container-page grid gap-6 md:grid-cols-2 md:gap-8">
        <ClipReveal className="md:col-span-2">
          <ParallaxFrame cover={wide} sizes={FRAME_SIZES} className="aspect-[4/3] md:aspect-[21/9]" />
        </ClipReveal>
        {rest.map((cover, index) => (
          <ClipReveal key={cover.src} delay={index * 0.1}>
            <ParallaxFrame cover={cover} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
          </ClipReveal>
        ))}
      </div>

      <LedgerSection
        title={dict.case.decisions}
        meta={fmt(dict.case.choicesCount, { n: pad2(project.decisions.length, locale) }, locale)}
        locale={locale}
        items={project.decisions.map((decision) => (
          <div key={decision.title} className="grid gap-3 md:grid-cols-[1fr_1.4fr] md:gap-10">
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{decision.title}</h3>
            <p className="max-w-sm text-muted">{decision.text}</p>
          </div>
        ))}
      />

      {fileCount > 0 ? (
        <CaseSection
          title={dict.case.code}
          meta={fmt(fileCount === 1 ? dict.case.fileOne : dict.case.fileMany, { n: pad2(fileCount, locale) }, locale)}
        >
          <div className="flex flex-col gap-14 md:gap-20">
            {project.snippets.map((snippet) => (
              <div key={snippet.filename} className="grid gap-6 md:grid-cols-12 md:gap-10">
                <Reveal className="md:col-span-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{snippet.title}</h3>
                  <p className="mt-4 text-muted">{snippet.description}</p>
                </Reveal>
                <div className="min-w-0 md:col-span-8">
                  <CodeBlock snippet={snippet} placeholderLabel={dict.case.placeholderCode} />
                </div>
              </div>
            ))}
          </div>
        </CaseSection>
      ) : null}

      <LedgerSection
        title={dict.case.learned}
        meta={fmt(dict.case.notesCount, { n: pad2(project.learned.length, locale) }, locale)}
        locale={locale}
        items={project.learned.map((note) => (
          <p key={note} className="max-w-md text-xl font-medium md:text-2xl">
            {note}
          </p>
        ))}
      />
    </div>
  )
}
