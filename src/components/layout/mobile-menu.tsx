"use client"

import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { site } from "@/content/site"
import { cn } from "@/lib/cn"
import { DURATION, EASE_IN_OUT, EASE_OUT, STAGGER } from "@/lib/motion"

interface MobileMenuProps {
  open: boolean
  current: string | null
  onClose: () => void
}

export function MobileMenu({ open, current, onClose }: MobileMenuProps) {
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
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="gutter fixed inset-0 z-(--z-menu) flex flex-col justify-between overflow-y-auto bg-ink pt-28 pb-8"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: DURATION.wipe, ease: EASE_IN_OUT }}
        >
          <nav aria-label="Mobile">
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.items, delayChildren: 0.2 } } }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="border-b border-line"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
                  }}
                >
                  <TransitionLink
                    href={item.href}
                    onNavigate={onClose}
                    aria-current={current === item.id ? "true" : undefined}
                    className={cn(
                      "flex items-baseline gap-5 py-4 font-display text-row uppercase",
                      current === item.id ? "text-accent" : "text-paper",
                    )}
                  >
                    <span className="label w-6 text-faint">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </TransitionLink>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="mt-12 flex flex-col gap-6">
            <a href={`mailto:${site.email}`} className="link-sweep w-fit font-display text-xl">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-muted transition-colors hover:text-paper"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
