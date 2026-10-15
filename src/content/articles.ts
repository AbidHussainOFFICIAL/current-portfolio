import type { Article } from "@/types/content"

// Each entry needs a matching file at src/content/articles/<slug>.mdx
export const articles: Article[] = [
  {
    slug: "why-i-start-on-paper",
    title: "Why I still start every project on paper",
    excerpt:
      "Before Figma and before code, a pen and a sheet of paper settle most of the questions that cost time later.",
    tag: "Process",
    date: "2026-09-12",
    readingTime: "4 min",
    cover: {
      alt: "Abstract warm gradient",
      gradient: "linear-gradient(135deg, #2a1f1a 0%, #0b0b0c 100%)",
    },
  },
  {
    slug: "server-components-in-practice",
    title: "Server Components in practice: what changed in my projects",
    excerpt:
      "Moving data fetching to the server removed a surprising amount of client code. Here is what I kept on the client and why.",
    tag: "Engineering",
    date: "2026-08-03",
    readingTime: "7 min",
    cover: {
      alt: "Abstract mint gradient",
      gradient: "linear-gradient(135deg, #12302a 0%, #0b0b0c 100%)",
    },
  },
  {
    slug: "pinned-scroll-gallery",
    title: "Building a pinned two-column scroll gallery",
    excerpt:
      "A walkthrough of the sticky layout behind the Work section: one column stays, the other travels, and it all degrades gracefully on phones.",
    tag: "Motion",
    date: "2026-06-21",
    readingTime: "8 min",
    cover: {
      alt: "Abstract blue gradient",
      gradient: "linear-gradient(135deg, #172033 0%, #0b0b0c 100%)",
    },
  },
  {
    slug: "designing-for-slow-connections",
    title: "Designing for slow connections",
    excerpt:
      "Not everyone browses on fibre. A few habits that keep a rich site usable on a weak mobile signal.",
    tag: "Performance",
    date: "2026-05-09",
    readingTime: "5 min",
    cover: {
      alt: "Abstract violet gradient",
      gradient: "linear-gradient(135deg, #2a1a33 0%, #0b0b0c 100%)",
    },
  },
  {
    slug: "freelancing-remotely",
    title: "Freelancing from Karachi for clients abroad",
    excerpt:
      "What I have learned about time zones, contracts, payments and trust while working with teams on other continents.",
    tag: "Career",
    date: "2026-03-15",
    readingTime: "6 min",
    cover: {
      alt: "Abstract amber gradient",
      gradient: "linear-gradient(135deg, #332a14 0%, #0b0b0c 100%)",
    },
  },
]
