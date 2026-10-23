import type { Cover, Project } from "@/types/content"

// Project facts come from the résumé.
//
// DUMMY / TO CHECK:
// - Pictures are generated art in /public/images/work. Replace a file with a real screenshot, keeping the
//   same file name, or point `src` at a new file. Landscape 16:10 (for example 1600x1000) fits best.
// - `stack` entries marked CONFIRM are inferred from the résumé skills.
// - `decisions` and `learned` are draft wording. Edit them so they match what you really did.
// - Snippets with `dummy: true` are placeholder code. Snippets with `file` are real files from this repository.
// - `palette`: the colour palette of the project's page (Colour kit). Home is Violet; Legal Case Management uses Harbor.
// - `links.repo`: leave it out while a repository is private. The GitHub button only shows when it is set.

const art = (name: string, alt: string): Cover => ({ src: `/images/work/${name}.jpg`, alt })

export const projects: Project[] = [
  {
    slug: "zivora",
    title: "Zivora",
    category: "E-commerce PWA",
    year: 2026,
    role: "Full-stack development",
    // CONFIRM
    stack: ["PWA", "Next.js", "Node.js", "MongoDB", "Cloudinary", "Vercel"],
    // The repository is private for now, so there is no `repo` link.
    links: { live: "https://zivora-abaya.vercel.app/" },
    palette: "violet",
    cover: art("zivora-cover", "Placeholder art for the Zivora project"),
    intro: "A full e-commerce progressive web app for a Pakistani modest-fashion brand.",
    summary:
      "Zivora is an abaya e-commerce platform built as a PWA for a Pakistani modest-fashion brand. It covers the product catalog, cart and checkout, with layouts tuned for mobile-first shopping, the dominant traffic pattern for the target market.",
    features: [
      "Product catalog that is quick to browse on a phone.",
      "Cart that keeps its contents between visits.",
      "Checkout flow from cart to confirmed order.",
      "Installable progressive web app with an app-like feel.",
      "Responsive layouts tuned for mobile-first shopping.",
    ],
    decisions: [
      {
        title: "A PWA instead of a native app",
        text: "One codebase reaches every phone and can still be installed to the home screen, which suits a small brand better than maintaining two native apps.",
      },
      {
        title: "Mobile-first layouts",
        text: "Most shoppers arrive on a phone, so every screen was designed at phone width first and then widened for larger screens.",
      },
      {
        title: "Hosted images",
        text: "Product photos are served from an image service (CONFIRM: Cloudinary) so they arrive in the right size for each device.",
      },
    ],
    learned: [
      "Checkout is where a small friction costs the most, so it earned the most testing time.",
      "Designing at phone width first makes the desktop version simpler, not harder.",
      "Offline behaviour needs deciding early. It is much harder to add at the end.",
    ],
    snippets: [
      {
        title: "Cart state",
        description:
          "A small reducer keeps every cart change in one predictable place. DUMMY: placeholder code, replace it with a real excerpt from the Zivora source.",
        filename: "cart-reducer.ts",
        language: "ts",
        dummy: true,
        code: `type CartLine = { id: string; name: string; price: number; qty: number }

type CartAction =
  | { type: "add"; line: Omit<CartLine, "qty"> }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" }

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((line) => line.id === action.line.id)
      if (!existing) return [...state, { ...action.line, qty: 1 }]
      return state.map((line) => (line.id === existing.id ? { ...line, qty: line.qty + 1 } : line))
    }
    case "remove":
      return state.filter((line) => line.id !== action.id)
    case "setQty":
      return state.map((line) => (line.id === action.id ? { ...line, qty: Math.max(1, action.qty) } : line))
    case "clear":
      return []
  }
}

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((sum, line) => sum + line.price * line.qty, 0)
`,
      },
    ],
    gallery: [
      art("zivora-1", "Placeholder art for the Zivora project, first picture"),
      art("zivora-2", "Placeholder art for the Zivora project, second picture"),
      art("zivora-3", "Placeholder art for the Zivora project, third picture"),
    ],
  },
  {
    slug: "legal-case-management",
    title: "Legal Case Management",
    category: "Case management",
    year: 2026,
    role: "Full-stack development",
    // CONFIRM
    stack: ["React", "Node.js", "Express.js", "MongoDB", "REST API", "Vercel"],
    // The repository is private for now, so there is no `repo` link.
    links: { live: "https://attorney-platform.vercel.app/" },
    palette: "harbor",
    cover: art("legal-cover", "Placeholder art for the Legal Case Management project"),
    intro: "A case-tracking platform for legal practices, from client records to case status.",
    summary:
      "A platform designed for legal practices to track their cases. It has modules for client records, document storage and case status workflows, backed by a data model and REST API that give secure, structured access to case information.",
    features: [
      "Client records with the cases that belong to each client.",
      "Document storage attached to the right case.",
      "Case status workflow from intake to closing.",
      "REST API that every module talks to.",
      "Structured access to case information.",
    ],
    decisions: [
      {
        title: "Data model first",
        text: "Clients, cases and documents were modelled before any screen was built, so every module shares one clear structure.",
      },
      {
        title: "One REST API for every module",
        text: "A single, consistent API layer keeps the interface simple and makes access to case data easy to secure and to test.",
      },
      {
        title: "Status as a workflow",
        text: "Case status moves through defined steps instead of free text, so it stays easy to query and to report on.",
      },
    ],
    learned: [
      "A clear data model removes most of the later rework.",
      "Permissions are much easier to design before the screens exist than after.",
      "Consistent API responses make the interface code far shorter.",
    ],
    snippets: [
      {
        title: "Changing a case status",
        description:
          "The route only allows the next valid step in the workflow. DUMMY: placeholder code, replace it with a real excerpt from the Legal Case Management source.",
        filename: "routes/cases.js",
        language: "js",
        dummy: true,
        code: `const STATUS_FLOW = ["intake", "active", "review", "closed"]

router.patch("/:id/status", requireAuth, async (req, res) => {
  const { status } = req.body
  const found = await Case.findById(req.params.id)
  if (!found) return res.status(404).json({ error: "Case not found" })

  const from = STATUS_FLOW.indexOf(found.status)
  const to = STATUS_FLOW.indexOf(status)
  if (to === -1 || to !== from + 1) {
    return res.status(400).json({ error: "Invalid status change" })
  }

  found.status = status
  found.history.push({ status, by: req.user.id, at: new Date() })
  await found.save()

  res.json(found)
})
`,
      },
    ],
    gallery: [
      art("legal-1", "Placeholder art for the Legal Case Management project, first picture"),
      art("legal-2", "Placeholder art for the Legal Case Management project, second picture"),
      art("legal-3", "Placeholder art for the Legal Case Management project, third picture"),
    ],
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    category: "Portfolio website",
    year: 2026,
    role: "Design and development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Lenis"],
    // Add `links: { repo: "https://github.com/AbidHussainOFFICIAL/<repository>" }` when the repository is public.
    palette: "violet",
    cover: art("portfolio-cover", "Placeholder art for the portfolio project"),
    intro: "This site: an editorial, motion-led portfolio built with Next.js and TypeScript.",
    summary:
      "The portfolio you are looking at. It is a single-page, section-based site with a few extra pages, built with Next.js, TypeScript and Tailwind CSS, with smooth scrolling, page transitions and scroll-driven motion.",
    features: [
      "Every section, page transition and interaction designed and built by hand.",
      "Typed content layer: projects and posts are added by editing one file.",
      "Smooth scrolling with scroll-driven motion and a custom cursor.",
      "Code blocks highlighted at build time, with no client-side cost.",
      "Accessible, responsive and respectful of reduced-motion settings.",
    ],
    decisions: [
      {
        title: "Content in typed files, not a CMS",
        text: "A portfolio changes rarely, so plain typed files give instant builds, type-checked content and nothing extra to host.",
      },
      {
        title: "Motion with a budget",
        text: "Animations use transforms and opacity only, run once where possible and switch off for people who ask for reduced motion.",
      },
      {
        title: "Code highlighted on the server",
        text: "shiki turns code into HTML at build time, so the page ships styled markup and no highlighting script.",
      },
    ],
    learned: [
      "Small shared helpers, such as one class-name function, keep a design system consistent.",
      "Reading hover state from the DOM instead of React state keeps a custom cursor smooth.",
      "Every animation needs a still, readable fallback.",
    ],
    snippets: [
      {
        title: "Merging class names",
        description:
          "Tailwind's merge helper has to know the custom font-size tokens, otherwise it mistakes them for colours and drops one of them.",
        filename: "src/lib/cn.ts",
        language: "ts",
        file: "src/lib/cn.ts",
      },
      {
        title: "A media query without hydration mismatches",
        description:
          "useSyncExternalStore with a server snapshot of false means the server and the first client render always agree.",
        filename: "src/hooks/use-media-query.ts",
        language: "ts",
        file: "src/hooks/use-media-query.ts",
      },
      {
        title: "Highlighting the current section",
        description: "One IntersectionObserver watches the sections and reports the one crossing the middle of the screen.",
        filename: "src/hooks/use-active-section.ts",
        language: "ts",
        file: "src/hooks/use-active-section.ts",
      },
    ],
    gallery: [
      art("portfolio-1", "Placeholder art for the portfolio project, first picture"),
      art("portfolio-2", "Placeholder art for the portfolio project, second picture"),
      art("portfolio-3", "Placeholder art for the portfolio project, third picture"),
    ],
  },
]
