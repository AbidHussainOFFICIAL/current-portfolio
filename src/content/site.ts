import type { SiteConfig } from "@/types/content"

// Placeholder data. Replace with real details later.
export const site: SiteConfig = {
  name: "Alex Morgan",
  role: "Creative Full-Stack Developer",
  city: "Karachi",
  country: "Pakistan",
  timezone: "Asia/Karachi",
  email: "hello@alexmorgan.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Portfolio of Alex Morgan, a creative full-stack developer in Karachi building fast, considered websites and web apps for clients around the world.",
  availability: {
    open: true,
    label: "Available for new projects",
  },
  intro:
    "I design and build websites and web apps from the first sketch to the last deploy, working with founders, studios and teams worldwide.",
  portrait: {
    alt: "Portrait placeholder",
    gradient: "linear-gradient(160deg, #1d3a35 0%, #131315 60%, #0b0b0c 100%)",
  },
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "X", url: "https://x.com/" },
    { label: "Dribbble", url: "https://dribbble.com/" },
  ],
  stats: [
    { value: 6, suffix: "+", label: "Years of experience" },
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 18, label: "Clients" },
    { value: 3, label: "Countries" },
  ],
  marquee: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Motion",
    "Design Systems",
    "Figma",
  ],
  about: {
    statement:
      "I build websites that feel considered: quick to load, easy to use and a little bit surprising.",
    paragraphs: [
      "I'm a full-stack developer based in Karachi. I start on paper, move to Figma, and then build the real thing in code, so the design that gets approved is the design that ships.",
      "Most of my work is for small teams who need one person to own the whole job: interface, front-end, back-end, performance and launch. I like clear briefs, honest timelines and projects with room to experiment.",
      "When I'm not working I'm usually reading about typography, tinkering with side projects or looking for a better cup of chai.",
    ],
    meta: [
      { label: "Based in", value: "Karachi, Pakistan" },
      { label: "Working with", value: "Clients worldwide, remote" },
      { label: "Focus", value: "Web design, front-end, back-end" },
      { label: "Languages", value: "English, Urdu" },
    ],
  },
  cvUrl: "/alex-morgan-cv.pdf",
}
