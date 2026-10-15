"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/cn"
import { SPRING_CURSOR_OPTIONS } from "@/lib/motion"

type Mode = "default" | "hover" | "view"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label"

const SIZES: Record<Mode, number> = { default: 12, hover: 56, view: 96 }

/**
 * Custom cursor for mouse users. Elements with data-cursor="View" show a labelled bubble,
 * links and buttons grow it.
 */
export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, SPRING_CURSOR_OPTIONS)
  const springY = useSpring(y, SPRING_CURSOR_OPTIONS)
  const [mode, setMode] = useState<Mode>("default")
  const [label, setLabel] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!finePointer) return

    const root = document.documentElement
    root.classList.add("cursor-active")

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    function onOver(event: PointerEvent) {
      if (!(event.target instanceof Element)) return
      const labelled = event.target.closest("[data-cursor]")
      if (labelled) {
        setMode("view")
        setLabel(labelled.getAttribute("data-cursor") ?? "")
      } else if (event.target.closest(INTERACTIVE)) {
        setMode("hover")
        setLabel("")
      } else {
        setMode("default")
        setLabel("")
      }
    }

    function onLeave() {
      setVisible(false)
    }

    window.addEventListener("pointermove", onMove)
    document.addEventListener("pointerover", onOver)
    root.addEventListener("pointerleave", onLeave)

    return () => {
      root.classList.remove("cursor-active")
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      root.removeEventListener("pointerleave", onLeave)
    }
  }, [finePointer, x, y])

  if (!finePointer) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-(--z-cursor)"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full",
          mode === "view" ? "bg-accent text-ink" : "bg-paper mix-blend-difference",
        )}
        animate={{
          width: SIZES[mode],
          height: SIZES[mode],
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {mode === "view" ? <span className="label">{label}</span> : null}
      </motion.div>
    </motion.div>
  )
}
