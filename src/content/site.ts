import type { SiteConfig } from "@/types/content"

// Real details come from the résumé. Anything marked DUMMY is a placeholder to replace later.
export const site: SiteConfig = {
  name: "Abid Hussain",
  role: "Creative Full-Stack Developer",
  city: "Karachi",
  country: "Pakistan",
  timezone: "Asia/Karachi",
  email: "010abidhussain@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Portfolio of Abid Hussain, a creative full-stack developer in Karachi building fast, considered websites and web apps with the MERN stack and TypeScript.",
  intro:
    "I build fast, considered websites and web apps with the MERN stack and TypeScript, owning every feature from the data model to the last pixel.",
  // DUMMY: portrait placeholder. Add a photo under /public/images and set src to use it.
  portrait: {
    alt: "Portrait of Abid Hussain (placeholder)",
    gradient: "linear-gradient(160deg, #1d3a35 0%, #131315 60%, #0b0b0c 100%)",
  },
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/abidhussainsoftware" },
    // DUMMY: replace with the real GitHub profile URL.
    { label: "GitHub", url: "https://github.com/" },
  ],
  stats: [
    { value: 3, label: "Apps in production" },
    { value: 1, label: "Full-stack internship" },
    { value: 3, label: "Years of IT training" },
    { value: 18, label: "Tools and technologies" },
  ],
  marquee: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Supabase",
    "Firebase",
  ],
  about: {
    statement:
      "I turn ideas into complete, working products: the data model, the API and an interface that feels good on a phone.",
    paragraphs: [
      "I'm a full-stack developer in Karachi working across the MERN stack and TypeScript. I have three production-deployed applications behind me, spanning e-commerce, legal case management and my own portfolio work.",
      "I'm most comfortable owning a feature end to end: designing the data model, building the REST API and shaping a responsive interface on top of it. I recently finished a full-stack internship at Teyzix Core, where I worked on real team projects.",
      "Right now I'm building toward AI tooling and product design alongside core web development.",
    ],
    meta: [
      { label: "Based in", value: "Karachi, Pakistan" },
      { label: "Stack", value: "MERN and TypeScript" },
      { label: "Education", value: "Diploma in IT, MITI" },
      { label: "Exploring", value: "AI tooling and product design" },
    ],
  },
  // DUMMY: replace the lines and the image at /public/images/parallax.jpg when you have your own.
  quote: {
    label: "How I work",
    lines: ["I don't just write code.", "I ship things people use."],
    by: "Abid Hussain",
  },
  cvUrl: "/Abid-Hussain-Resume.pdf",
}
