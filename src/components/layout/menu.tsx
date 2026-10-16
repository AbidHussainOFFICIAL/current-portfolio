"use client"

import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { site } from "@/content/site"
import { EASE_IN_OUT } from "@/lib/motion"

interface MenuProps {
  open: boolean
  current: string | null
  onClose: () => void
}

/** Full-screen menu that wipes down over the page (Noir style). */
export function Menu({ open, current, onClose }: MenuProps) {
  const lenis = useLenis()

  // Lock page scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return

    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = "hidden"
    lenis?.stop()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      root.style.overflow = previous
      lenis?.start()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, lenis, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-(--z-menu) overflow-y-auto bg-accent text-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        >
          <div className="flex min-h-full flex-col justify-center pt-24 pb-8">
            <nav aria-label="Primary">
              <ul className="border-t border-ink/15">
                {navItems.map((item, index) => (
                  <li key={item.id} className="overflow-hidden border-b border-ink/15">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.4, delay: 0 } }}
                      transition={{ duration: 0.7, delay: 0.15 + index * 0.06, ease: EASE_IN_OUT }}
                    >
                      <TransitionLink
                        href={item.href}
                        data-cursor=""
                        onNavigate={onClose}
                        aria-current={current === item.id ? "true" : undefined}
                        className="group gutter container-page flex items-baseline gap-4 py-2 md:gap-8 md:py-3"
                      >
                        <span className="text-xs font-medium text-ink/50 tabular-nums md:text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[length:min(11vw,8.5svh)] leading-[0.95] font-medium transition-transform duration-500 group-hover:translate-x-4 md:text-[length:min(7vw,8.5svh)] md:group-hover:translate-x-8">
                          {item.label}
                        </span>
                        {current === item.id ? (
                          <span aria-hidden className="size-2.5 self-center rounded-full bg-ink" />
                        ) : null}
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="gutter container-page mt-8 flex flex-wrap gap-x-10 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href={`mailto:${site.email}`} className="label link-sweep pb-1 text-ink/70 hover:text-ink">
                {site.email}
              </a>
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-sweep pb-1 text-ink/70 hover:text-ink"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
