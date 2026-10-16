import type { Cover, GalleryItem, Project } from "@/types/content"

// Project facts come from the résumé. Covers and gallery images are DUMMY gradients:
// put real screenshots in /public/images/work and set `src` on the cover or gallery item.
// Stacks marked CONFIRM are inferred from the résumé skills, so check them.

const cover = (alt: string, from: string, to: string, deg = 135): Cover => ({
  alt,
  gradient: `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`,
})

const gallery = (name: string, from: string, to: string, captions: [string, string, string]): GalleryItem[] => [
  { cover: cover(`${name} screenshot placeholder`, from, to, 135), caption: captions[0] },
  { cover: cover(`${name} screenshot placeholder`, to, from, 200), caption: captions[1] },
  { cover: cover(`${name} screenshot placeholder`, from, "#0b0b0c", 160), caption: captions[2] },
]

export const projects: Project[] = [
  {
    slug: "zivora",
    title: "Zivora",
    category: "E-commerce PWA",
    year: 2026,
    role: "Full-stack development",
    // CONFIRM
    stack: ["PWA", "Next.js", "Node.js", "MongoDB", "Cloudinary", "Vercel"],
    links: { live: "https://zivora-abaya.vercel.app/" },
    cover: cover("Zivora abaya store", "#2a1f1a", "#0b0b0c"),
    intro: "A full e-commerce progressive web app for a Pakistani modest-fashion brand.",
    summary:
      "Zivora is an abaya e-commerce platform built as a PWA for a Pakistani modest-fashion brand. It covers the product catalog, cart and checkout, with layouts tuned for mobile-first shopping, the dominant traffic pattern for the target market.",
    highlights: [
      "Built the full shopping flow: product catalog, cart and checkout.",
      "Implemented responsive layouts tuned for mobile-first shopping behaviour.",
      "Shipped it as an installable progressive web app, deployed on Vercel.",
    ],
    gallery: gallery("Zivora", "#2a1f1a", "#0b0b0c", ["Home page", "Product page", "Cart and checkout"]),
  },
  {
    slug: "legal-case-management",
    title: "Legal Case Management",
    category: "Case management",
    year: 2026,
    role: "Full-stack development",
    // CONFIRM
    stack: ["React", "Node.js", "Express.js", "MongoDB", "REST API", "Vercel"],
    links: { live: "https://attorney-platform.vercel.app/" },
    cover: cover("Legal case management dashboard", "#12302a", "#0b0b0c"),
    intro: "A case-tracking platform for legal practices, from client records to case status.",
    summary:
      "A platform designed for legal practices to track their cases. It has modules for client records, document storage and case status workflows, backed by a data model and REST API that give secure, structured access to case information.",
    highlights: [
      "Designed the data model and the REST API layer behind every module.",
      "Built client records, document storage and case status workflows.",
      "Structured access to case information so it stays secure and easy to query.",
    ],
    gallery: gallery("Legal Case Management", "#12302a", "#0b0b0c", ["Dashboard", "Client records", "Case workflow"]),
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    category: "Portfolio website",
    year: 2026,
    role: "Design and development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Lenis"],
    cover: cover("Portfolio website", "#172033", "#0b0b0c"),
    intro: "This site: an editorial, motion-led portfolio built with Next.js and TypeScript.",
    summary:
      "The portfolio you are looking at. It is a single-page, section-based site with a few extra pages, built with Next.js, TypeScript and Tailwind CSS, with smooth scrolling, page transitions and scroll-driven motion.",
    highlights: [
      "Designed and built every section, page transition and interaction myself.",
      "Typed content layer, so projects and posts are added by editing one file.",
      "Accessible, responsive and respectful of reduced-motion settings.",
    ],
    gallery: gallery("Portfolio", "#172033", "#0b0b0c", ["Home", "Work", "Posts"]),
  },
]
