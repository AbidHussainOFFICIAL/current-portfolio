"use client"

import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { site } from "@/content/site"
import { EASE_IN_OUT } from "@/lib/motion"
import { pad2 } from "@/lib/format"

interface MenuProps {
  open: boolean
  current: string | null
  onClose: () => void
}

/**
 * Full-screen menu that wipes down over the page (Noir style). Links sit two per row so all of
 * them fit on one screen. The page scrollbar gutter is always reserved (see globals.css), so
 * stopping the page scroll never makes a scrollbar flash in or out.
 */
export function Menu({ open, current, onClose }: MenuProps) {
  const lenis = useLenis()

  // Stop page scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return

    lenis?.stop()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
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
          // w-screen also covers the reserved scrollbar gutter, so no dark strip shows beside the menu.
          className="fixed top-0 left-0 z-(--z-menu) flex h-svh w-screen flex-col overflow-hidden bg-accent pt-[5.5rem] text-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        >
          <nav aria-label="Primary" className="min-h-0 flex-1 border-t border-ink/15">
            <ul className="grid h-full grid-cols-2 grid-rows-4">
              {navItems.map((item, index) => (
                <li
                  key={item.id}
                  className="min-h-0 overflow-hidden border-b border-ink/15 odd:border-r"
                >
                  <motion.div
                    className="h-full"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.4, delay: 0 } }}
                    transition={{ duration: 0.7, delay: 0.15 + index * 0.05, ease: EASE_IN_OUT }}
                  >
                    <TransitionLink
                      href={item.href}
                      data-cursor=""
                      onNavigate={onClose}
                      aria-current={current === item.id ? "true" : undefined}
                      className="group flex h-full flex-col justify-between px-5 py-4 md:px-10 md:py-6 xl:px-16"
                    >
                      <span className="flex items-center justify-between text-xs font-medium text-ink/50 tabular-nums md:text-sm">
                        {pad2(index + 1)}
                        {current === item.id ? (
                          <span aria-hidden className="size-2.5 rounded-full bg-ink" />
                        ) : null}
                      </span>
                      <span className="block font-display text-[length:min(6.4vw,10svh)] leading-[0.95] font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-3 md:text-[length:min(5.6vw,11svh)] md:group-hover:translate-x-6">
                        {item.label}
                      </span>
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="gutter container-page flex flex-wrap gap-x-8 gap-y-2 py-4 md:gap-x-10 md:py-5"
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
