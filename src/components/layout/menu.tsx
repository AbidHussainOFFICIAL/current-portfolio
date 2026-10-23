"use client"

import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

import { Preferences } from "@/components/ui/preferences"
import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { useDictionary, useLocale, useSite } from "@/i18n/locale-provider"
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
  const locale = useLocale()
  const dict = useDictionary()
  const site = useSite()

  // Tint the page scrollbar gutter with the menu. Removed the moment the menu starts closing.
  useEffect(() => {
    const root = document.documentElement
    root.toggleAttribute("data-menu-open", open)
    return () => root.removeAttribute("data-menu-open")
  }, [open])

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
          aria-label={dict.common.menu}
          data-on-accent
          // w-screen also covers the reserved scrollbar gutter, so no dark strip shows beside the menu.
          className="fixed start-0 top-0 z-(--z-menu) flex h-svh w-screen flex-col overflow-hidden bg-accent pt-24 text-accent-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        >
          <nav aria-label={dict.common.primaryNav} className="min-h-0 flex-1 border-t border-accent-ink/15">
            <ul className="grid h-full grid-cols-2 grid-rows-4">
              {navItems.map((item, index) => (
                <li
                  key={item.id}
                  className="min-h-0 overflow-hidden border-b border-accent-ink/15 odd:border-e"
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
                      instant
                      aria-current={current === item.id ? "true" : undefined}
                      className="group flex h-full flex-col justify-between px-5 py-4 md:px-10 md:py-6 xl:px-16"
                    >
                      <span className="flex items-center justify-between text-xs font-medium text-accent-ink/70 tabular-nums md:text-sm">
                        {pad2(index + 1, locale)}
                        {current === item.id ? (
                          <span aria-hidden className="size-2.5 rounded-full bg-accent-ink" />
                        ) : null}
                      </span>
                      <span className="display-menu block transition-transform duration-500 group-hover:nudge-3 md:group-hover:nudge-6">
                        {dict.nav[item.id]}
                      </span>
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="gutter container-page flex flex-wrap items-center gap-x-8 gap-y-1 py-3 md:gap-x-10 md:py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={`mailto:${site.email}`}
              dir="ltr"
              className="label link-sweep tap pb-1 text-accent-ink/80 hover:text-accent-ink"
            >
              {site.email}
            </a>
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label link-sweep tap pb-1 text-accent-ink/80 hover:text-accent-ink"
              >
                {social.label}
                <span className="sr-only"> {dict.common.opensInNewTab}</span>
              </a>
            ))}
            <Preferences className="ms-auto sm:hidden" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
