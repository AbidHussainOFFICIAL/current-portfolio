"use client"

import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"

import { Menu } from "@/components/layout/menu"
import { Logo } from "@/components/ui/logo"
import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { site } from "@/content/site"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/cn"
import { DURATION, EASE_OUT } from "@/lib/motion"

const SECTION_IDS = ["top", ...navItems.map((item) => item.id)] as const

/** Scroll distance before the header starts hiding while scrolling down. */
const HIDE_AFTER = 120

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const section = useActiveSection(SECTION_IDS, pathname === "/")
  const { scrollY } = useScroll()

  // Hide on the way down, show again as soon as the person scrolls up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > HIDE_AFTER) setHidden(true)
    else if (latest < previous) setHidden(false)
  })

  let current: string | null = null
  if (pathname === "/") current = section === "top" ? null : section
  else if (pathname.startsWith("/work")) current = "work"
  else if (pathname.startsWith("/posts")) current = "posts"

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-(--z-header)",
          menuOpen ? "text-ink" : "text-white mix-blend-difference",
        )}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: DURATION.base, ease: EASE_OUT }}
      >
        <div className="gutter flex items-center justify-between py-6">
          <TransitionLink
            href="/"
            data-cursor=""
            onNavigate={closeMenu}
            className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight"
          >
            <Logo />
            {site.name}
          </TransitionLink>

          <div className="flex items-center gap-8">
            <span className="label hidden opacity-60 md:block">
              {site.city} — {site.country}
            </span>
            <button
              type="button"
              data-cursor=""
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex w-10 flex-col items-end gap-[6px]"
            >
              <motion.span
                className="block h-[2px] bg-current"
                animate={{ width: menuOpen ? 32 : 40, rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] bg-current"
                animate={{ width: menuOpen ? 32 : 24, rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <Menu open={menuOpen} current={current} onClose={closeMenu} />
    </>
  )
}
