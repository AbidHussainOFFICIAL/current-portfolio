"use client"

import { motion, useReducedMotion } from "motion/react"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useLenis } from "lenis/react"

import { DURATION, EASE_IN_OUT } from "@/lib/motion"

type Phase = "idle" | "covering" | "revealing"

interface PageTransitionContextValue {
  navigate: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition(): PageTransitionContextValue {
  const context = useContext(PageTransitionContext)
  if (!context) throw new Error("usePageTransition must be used inside PageTransitionProvider")
  return context
}

const curtainVariants = {
  idle: { y: "100%", transition: { duration: 0 } },
  covering: { y: "0%", transition: { duration: DURATION.wipe, ease: EASE_IN_OUT } },
  revealing: { y: "-100%", transition: { duration: DURATION.wipe, ease: EASE_IN_OUT } },
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const lenis = useLenis()

  const [phase, setPhase] = useState<Phase>("idle")
  const [seenPath, setSeenPath] = useState(pathname)
  const target = useRef<string | null>(null)

  // The route changed while the curtain was closed: open it.
  if (pathname !== seenPath) {
    setSeenPath(pathname)
    if (phase === "covering") setPhase("revealing")
  }

  // Safety net: never leave the screen covered if a navigation does not complete.
  useEffect(() => {
    if (phase !== "covering") return
    const timer = setTimeout(() => setPhase("revealing"), 4000)
    return () => clearTimeout(timer)
  }, [phase])

  const navigate = useCallback(
    (href: string) => {
      const hashIndex = href.indexOf("#")
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : ""
      const path = href.replace(/[#?].*$/, "") || pathname

      // Same page: scroll instead of navigating.
      if (path === pathname) {
        if (hash.length > 1) {
          const element = document.getElementById(hash.slice(1))
          if (element) {
            if (lenis) lenis.scrollTo(element, { offset: 0, immediate: reduced === true })
            else element.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
            history.pushState(null, "", href)
          }
        } else if (lenis) {
          lenis.scrollTo(0, { immediate: reduced === true })
        } else {
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
        }
        return
      }

      if (reduced) {
        router.push(href)
        return
      }

      target.current = href
      setPhase("covering")
    },
    [lenis, pathname, reduced, router],
  )

  const value = useMemo(() => ({ navigate }), [navigate])

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <motion.div
        aria-hidden
        className={`fixed inset-0 z-(--z-curtain) bg-surface ${
          phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
        }`}
        variants={curtainVariants}
        initial="idle"
        animate={phase}
        onAnimationComplete={(definition) => {
          if (definition === "covering" && target.current) {
            const href = target.current
            target.current = null
            router.push(href)
          } else if (definition === "revealing") {
            setPhase("idle")
          }
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-accent" />
      </motion.div>
    </PageTransitionContext.Provider>
  )
}
