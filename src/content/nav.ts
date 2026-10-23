import type { NavItem } from "@/types/content"

/**
 * `id` is the section id on the home page (used to highlight the current link while scrolling) and the
 * key of the label in the dictionary (nav.<id>). Work and Posts open their own pages; the other links
 * scroll to a home-page section. Paths carry no language: TransitionLink adds it.
 */
export const navItems: NavItem[] = [
  { id: "work", href: "/work" },
  { id: "about", href: "/#about" },
  { id: "services", href: "/#services" },
  { id: "experience", href: "/#experience" },
  { id: "certificates", href: "/#certificates" },
  { id: "skills", href: "/#skills" },
  { id: "posts", href: "/posts" },
  { id: "contact", href: "/#contact" },
]
