"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { SPRING_CURSOR_OPTIONS } from "@/lib/motion"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label"

const SIZE_DEFAULT = 12
const SIZE_HOVER = 56
const SIZE_LABEL = 88

/**
 * Noir-style cursor for mouse users: a small white dot that inverts whatever is under it.
 * It grows over links and buttons, and shows a label over elements with data-cursor="Label".
 */
export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, SPRING_CURSOR_OPTIONS)
  const springY = useSpring(y, SPRING_CURSOR_OPTIONS)
  const [size, setSize] = useState(SIZE_DEFAULT)
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
      const tagged = event.target.closest("[data-cursor]")
      const text = tagged?.getAttribute("data-cursor") ?? ""

      if (tagged && text) {
        setSize(SIZE_LABEL)
        setLabel(text)
      } else if (tagged || event.target.closest(INTERACTIVE)) {
        setSize(SIZE_HOVER)
        setLabel("")
      } else {
        setSize(SIZE_DEFAULT)
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
      className="pointer-events-none fixed top-0 left-0 z-(--z-cursor) mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white"
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {label ? (
          <span className="text-[11px] font-medium tracking-[0.15em] text-black uppercase select-none">
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  )
}
