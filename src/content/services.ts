import type { Service } from "@/types/content"

export const services: Service[] = [
  {
    index: "01",
    name: "Full-Stack Web Apps",
    description:
      "Features owned end to end: the data model, the REST API and a responsive interface on top, built with the MERN stack and TypeScript.",
    tags: ["Next.js", "React", "Node.js", "Express.js", "MongoDB"],
  },
  {
    index: "02",
    name: "E-Commerce and PWAs",
    description:
      "Stores and installable web apps with catalog, cart and checkout flows, designed mobile-first for the way people really shop.",
    tags: ["PWA", "Cart and checkout", "Cloudinary", "Vercel"],
  },
  {
    index: "03",
    name: "APIs and Databases",
    description:
      "Clean REST APIs and well-structured data models that give secure access to information and stay simple to maintain.",
    tags: ["REST API design", "MongoDB", "PostgreSQL", "Firebase", "Supabase"],
  },
  {
    index: "04",
    name: "Portfolio and Business Sites",
    description:
      "Fast, accessible marketing sites and portfolios with considered typography, smooth motion and clean, editable content.",
    tags: ["Next.js", "Tailwind CSS", "Motion", "SEO"],
  },
]
