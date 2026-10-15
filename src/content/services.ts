import type { Service } from "@/types/content"

export const services: Service[] = [
  {
    index: "01",
    name: "Web Design and UI",
    description:
      "Interfaces designed in the browser as much as in Figma. I define the layout, type and motion together so nothing gets lost between design and build.",
    tags: ["UI design", "Prototyping", "Design systems", "Brand sites"],
  },
  {
    index: "02",
    name: "Front-end Engineering",
    description:
      "Accessible, responsive front-ends in React and Next.js with clean TypeScript, sensible structure and components that are easy to extend.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    index: "03",
    name: "Back-end and APIs",
    description:
      "The server side done properly: data models, authentication, APIs and integrations that stay simple to maintain once the project is live.",
    tags: ["Node.js", "PostgreSQL", "REST and tRPC", "Auth"],
  },
  {
    index: "04",
    name: "Motion and Performance",
    description:
      "Animation that supports the content, and performance budgets that keep it fast on ordinary phones and ordinary connections.",
    tags: ["Motion", "Core Web Vitals", "Accessibility", "SEO"],
  },
]
