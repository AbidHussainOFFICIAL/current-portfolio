import type { Cover, Post } from "@/types/content"

// DUMMY: every post below is placeholder text. Replace each entry with a real social media post:
// set `platform`, `url` (the link to the original post), the text in `body` and a real `date`.
// Covers are generated art in /public/images/posts (post-1.jpg ... post-4.jpg). Replace a file with a real
// screenshot of the post, keeping the same file name, or point `cover.src` at a new file.

const cover = (n: number): Cover => ({ src: `/images/posts/post-${n}.jpg`, alt: "Placeholder cover art" })

export const posts: Post[] = [
  {
    slug: "owning-a-feature-end-to-end",
    platform: "LinkedIn",
    title: "Why I like owning a feature end to end",
    excerpt: "Placeholder post. Designing the data model, the API and the interface together removes a lot of hand-offs.",
    date: "2026-09-28",
    url: "https://www.linkedin.com/",
    cover: cover(1),
    body: [
      "This is placeholder text for a social media post. Replace it with the real text of your post, paragraph by paragraph.",
      "Each string in the body list becomes one paragraph on the page, and the first letter of the first paragraph becomes the large drop cap.",
      "When the real posts are added, the button at the bottom of the page links to the original post on its platform.",
    ],
    quote: "Placeholder pull quote: one strong line from the post.",
  },
  {
    slug: "shipping-an-ecommerce-pwa",
    platform: "LinkedIn",
    title: "Shipping an e-commerce PWA for a local brand",
    excerpt: "Placeholder post. Notes on building a mobile-first store from catalog to checkout.",
    date: "2026-09-10",
    url: "https://www.linkedin.com/",
    cover: cover(2),
    body: [
      "This is placeholder text for a social media post about shipping a project. Replace it with your real post.",
      "Write the post the way you published it, and split it into paragraphs so it reads well on the page.",
    ],
    quote: "Placeholder pull quote: what you would tell someone starting the same project.",
  },
  {
    slug: "what-my-internship-taught-me",
    platform: "LinkedIn",
    title: "What a full-stack internship taught me",
    excerpt: "Placeholder post. Lessons from working on real team projects in a live environment.",
    date: "2026-08-19",
    url: "https://www.linkedin.com/",
    cover: cover(3),
    body: [
      "This is placeholder text for a social media post about learning on the job. Replace it with your real post.",
      "Keep the paragraphs short. Long walls of text are hard to read on a phone.",
    ],
    quote: "Placeholder pull quote: the single biggest lesson.",
  },
  {
    slug: "designing-a-case-management-api",
    platform: "LinkedIn",
    title: "Designing the API behind a case management system",
    excerpt: "Placeholder post. How a clear data model made the rest of the build simpler.",
    date: "2026-07-02",
    url: "https://www.linkedin.com/",
    cover: cover(4),
    body: [
      "This is placeholder text for a social media post about backend design. Replace it with your real post.",
      "Posts are shown newest first, so the date decides the order on the home page and on the Posts page.",
    ],
    quote: "Placeholder pull quote: a sentence about data modelling.",
  },
]
