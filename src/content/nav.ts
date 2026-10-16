import type { NavItem } from "@/types/content"

/**
 * `id` is the section id on the home page (used to highlight the current link while scrolling).
 * Work and Posts open their own pages; the other links scroll to a home-page section.
 */
export const navItems: NavItem[] = [
  { label: "Work", id: "work", href: "/work" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Services", id: "services", href: "/#services" },
  { label: "Experience", id: "experience", href: "/#experience" },
  { label: "Certificates", id: "certificates", href: "/#certificates" },
  { label: "Skills", id: "skills", href: "/#skills" },
  { label: "Posts", id: "posts", href: "/posts" },
  { label: "Contact", id: "contact", href: "/#contact" },
]
