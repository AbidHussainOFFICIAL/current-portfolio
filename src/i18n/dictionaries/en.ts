/**
 * Interface text in English. Every string a visitor can read that is not site content lives here;
 * the site content itself (projects, posts, ...) is in src/content. The Urdu twin is ur.ts and must
 * have exactly the same keys, which the Dictionary type below enforces.
 *
 * "{n}", "{name}" ... are filled in with fmt() from src/lib/format.ts.
 */
export const en = {
  common: {
    skipToContent: "Skip to content",
    opensInNewTab: "(opens in a new tab)",
    loading: "Loading",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    backToTop: "Back to top",
    copyEmail: "Copy email",
    copied: "Copied",
    downloadCv: "Download CV",
    sayHello: "Say hello",
    allProjects: "All projects",
    allPosts: "All posts",
    readPost: "Read post",
    projectsCount: "{n} projects",
    postsCount: "{n} posts",
    clockCode: "KHI",
    localTime: "Local time",
    rights: "All rights reserved.",
    emailLabel: "Email",
    socialLabel: "Social links",
  },
  preferences: {
    label: "Preferences",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchLanguage: "Read this page in Urdu",
    languageName: "اردو",
  },
  cursor: {
    view: "View",
    read: "Read",
    next: "Next",
    contact: "Contact",
  },
  nav: {
    work: "Work",
    about: "About",
    services: "Services",
    experience: "Experience",
    certificates: "Certificates",
    skills: "Skills",
    posts: "Posts",
    contact: "Contact",
  },
  hero: {
    seeWork: "See selected work",
  },
  marquee: {
    label: "Technologies I work with",
  },
  work: {
    selectedFirst: "Selected",
    selectedSecond: "Works",
    sectionLabel: "Selected works",
    pageTitle: "All Projects",
    pageDescription: "Websites and web apps I have built, with a page for each project.",
  },
  about: {
    title: "About",
    placeOfWork: "{city}, {country}",
  },
  services: {
    title: "Services",
    count: "{n} services",
  },
  experience: {
    title: "Experience",
    range: "2023 — 2026",
  },
  certificates: {
    title: "Certificates",
    count: "{n} credentials",
  },
  skills: {
    title: "Skills",
    count: "{n} tools",
    groupCount: "{n} tools",
  },
  testimonials: {
    title: "Kind words",
    previous: "Previous testimonial",
    next: "Next testimonial",
  },
  posts: {
    title: "Posts",
    pageTitle: "Posts",
    pageDescription: "Posts I have shared on social media about building for the web.",
    back: "Posts",
    nextPost: "Next post",
    openOriginal: "Open the original post on {platform}",
    postedBy: "Posted by {name}",
    feedTitle: "{name} — Posts",
  },
  case: {
    allProjects: "All projects",
    brief: "The brief",
    features: "Features",
    decisions: "Tech decisions",
    code: "Code",
    learned: "What I learned",
    role: "Role",
    year: "Year",
    type: "Type",
    stack: "Stack",
    live: "Live",
    source: "Source",
    visitSite: "Visit site",
    github: "GitHub",
    liveSite: "Live site",
    githubRepository: "GitHub repository",
    itemsCount: "{n} items",
    choicesCount: "{n} choices",
    notesCount: "{n} notes",
    fileOne: "{n} file",
    fileMany: "{n} files",
    placeholderCode: "Placeholder code",
    nextProject: "Next project",
  },
  contact: {
    lineOne: "Let’s work",
    lineTwo: "together",
  },
  notFound: {
    label: "Error 404",
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    back: "Back to home",
    metaTitle: "Page not found",
  },
  error: {
    label: "Something went wrong",
    title: "Unexpected error",
    text: "The page failed to load. You can try again, and if it keeps happening please come back later.",
    retry: "Try again",
  },
}

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> }

/** Shape of a dictionary: the same keys as the English one, any text. */
export type Dictionary = Widen<typeof en>
