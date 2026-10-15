import type { Transition, Variants } from "motion/react"

type Bezier = [number, number, number, number]

/** Easings */
export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: Bezier = [0.76, 0, 0.24, 1]

/** Durations in seconds */
export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  wipe: 0.6,
} as const

/** Stagger gaps in seconds */
export const STAGGER = {
  letters: 0.06,
  items: 0.08,
} as const

/** Springs. The plain option objects are for useSpring, the Transition versions for animate props. */
export const SPRING_CURSOR_OPTIONS = { stiffness: 500, damping: 40, mass: 0.6 }
export const SPRING_SOFT_OPTIONS = { stiffness: 200, damping: 25, mass: 0.5 }

export const SPRING_CURSOR: Transition = { type: "spring", ...SPRING_CURSOR_OPTIONS }
export const SPRING_SOFT: Transition = { type: "spring", ...SPRING_SOFT_OPTIONS }

/** Scroll reveal: play once, start slightly before the element is fully in view. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const

/** Fade and rise. Use with initial="hidden" and whileInView="show". */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

/** Parent that staggers its children. */
export const staggerItems: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.items } },
}

/** Parent that staggers letters. */
export const staggerLetters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.letters } },
}

/** One letter or line sliding up out of a clipped wrapper. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}
