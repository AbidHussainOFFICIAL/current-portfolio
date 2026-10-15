"use client"

import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"

import { MobileMenu } from "@/components/layout/mobile-menu"
import { LiveClock } from "@/components/ui/live-clock"
import { TransitionLink } from "@/components/ui/transition-link"
import { navItems } from "@/content/nav"
import { site } from "@/content/site"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/cn"

const SECTION_IDS = ["top", ...navItems.map((item) => item.id)] as const

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const section = useActiveSection(SECTION_IDS, pathname === "/")

  let current: string | null = null
  if (pathname === "/") current = section === "top" ? null : section
  else if (pathname.startsWith("/work")) current = "work"
  else if (pathname.startsWith("/journal")) current = "journal"

  return (
    <>
      <header className="gutter fixed inset-x-0 top-0 z-(--z-header) flex items-center justify-between py-5 text-paper mix-blend-difference">
        <div className="flex items-center gap-6">
          <TransitionLink
            href="/"
            className="font-display text-lg font-bold tracking-tight"
            onNavigate={closeMenu}
          >
            {site.name}
          </TransitionLink>
          <LiveClock
            timeZone={site.timezone}
            label="KHI"
            className="label hidden text-paper/70 md:inline"
          />
        </div>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <TransitionLink
                  href={item.href}
                  aria-current={current === item.id ? "true" : undefined}
                  className={cn(
                    "label link-sweep pb-1 transition-opacity",
                    current === item.id ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )}
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="label xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <MobileMenu open={menuOpen} current={current} onClose={closeMenu} />
    </>
  )
}
