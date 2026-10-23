"use client"

import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Menu } from "@/components/layout/menu"
import { Logo } from "@/components/ui/logo"
import { Preferences } from "@/components/ui/preferences"
import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { splitLocale } from "@/i18n/config"
import { useDictionary, useSite } from "@/i18n/locale-provider"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/cn"
import { fmt } from "@/lib/format"
import { DURATION, EASE_OUT } from "@/lib/motion"

const SECTION_IDS = ["top", ...navItems.map((item) => item.id)] as const

/** Scroll distance before the header starts hiding while scrolling down. */
const HIDE_AFTER = 120

export function Header() {
  const { locale, path } = splitLocale(usePathname())
  const site = useSite()
  const dict = useDictionary()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const isHome = path === "/"
  const section = useActiveSection(SECTION_IDS, isHome)
  const { scrollY } = useScroll()

  // Hide on the way down, show again as soon as the person scrolls up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > HIDE_AFTER) setHidden(true)
    else if (latest < previous) setHidden(false)
  })

  let current: string | null = null
  if (isHome) current = section === "top" ? null : section
  else if (path.startsWith("/work")) current = "work"
  else if (path.startsWith("/posts")) current = "posts"

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-(--z-header)",
          menuOpen ? "text-accent-ink" : "text-white mix-blend-difference",
        )}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: DURATION.base, ease: EASE_OUT }}
      >
        <div className="gutter flex items-center justify-between py-4">
          <TransitionLink
            href="/"
            data-cursor=""
            onNavigate={closeMenu}
            className="flex min-h-11 items-center gap-3 font-display text-xl font-semibold tracking-tight"
          >
            <Logo />
            {site.name}
          </TransitionLink>

          <div className="flex items-center gap-2 md:gap-4">
            <span className="label hidden opacity-60 lg:block">
              {fmt(dict.about.placeOfWork, { city: site.city, country: site.country }, locale)}
            </span>
            {/* On a phone these two controls live at the foot of the menu instead. */}
            <Preferences className="hidden sm:flex" />
            <button
              type="button"
              data-cursor=""
              aria-label={menuOpen ? dict.common.closeMenu : dict.common.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-11 flex-col items-end justify-center gap-2"
            >
              <motion.span
                className="block h-0.5 bg-current"
                animate={{ width: menuOpen ? 32 : 40, rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 bg-current"
                animate={{ width: menuOpen ? 32 : 24, rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
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
