"use client"

import { useEffect, useRef } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label"

/** The dot is drawn at its largest size and scaled down, so only a transform ever changes. */
const BASE = 88
const SIZE_DEFAULT = 12
const SIZE_HOVER = 56

/** Share of the remaining distance covered per frame at 60 fps. Lower is floatier. */
const FOLLOW = 0.2
const RESIZE = 0.16

/**
 * Noir-style cursor for mouse users: a small white dot that inverts whatever is under it.
 * It grows over links and buttons, and shows a label over elements with data-cursor="Label".
 *
 * It runs outside React: one requestAnimationFrame loop eases the position, size and label
 * towards their targets and writes transforms straight to the elements. Nothing re-renders
 * while the mouse moves, and the loop sleeps once the dot has settled.
 */
export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!finePointer || !root || !dot || !label) return

    const html = document.documentElement
    html.classList.add("cursor-active")

    // Pointer position, eased position, and the size and label the dot is heading for.
    let mouseX = -100
    let mouseY = -100
    let x = -100
    let y = -100
    let scale = SIZE_DEFAULT / BASE
    let targetScale = scale
    let labelOpacity = 0
    let targetLabelOpacity = 0
    let seen = false
    let recheck = false
    let frameId = 0
    let last = 0

    function resolve(element: Element | null) {
      const tagged = element?.closest("[data-cursor]") ?? null
      const text = tagged?.getAttribute("data-cursor") ?? ""

      if (tagged && text) {
        targetScale = 1
        targetLabelOpacity = 1
        if (label && label.textContent !== text) label.textContent = text
      } else if (tagged || element?.closest(INTERACTIVE)) {
        targetScale = SIZE_HOVER / BASE
        targetLabelOpacity = 0
      } else {
        targetScale = SIZE_DEFAULT / BASE
        targetLabelOpacity = 0
      }
    }

    function frame(now: number) {
      const dt = Math.min(now - last, 50)
      last = now
      const follow = 1 - Math.pow(1 - FOLLOW, dt / 16.667)
      const resize = 1 - Math.pow(1 - RESIZE, dt / 16.667)

      // Scrolling moves the page under a still mouse, so look at what is under it again.
      if (recheck) {
        recheck = false
        resolve(document.elementFromPoint(mouseX, mouseY))
      }

      x += (mouseX - x) * follow
      y += (mouseY - y) * follow
      scale += (targetScale - scale) * resize
      labelOpacity += (targetLabelOpacity - labelOpacity) * resize

      root!.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      dot!.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`
      label!.style.opacity = labelOpacity.toFixed(3)

      const settled =
        Math.abs(mouseX - x) < 0.05 &&
        Math.abs(mouseY - y) < 0.05 &&
        Math.abs(targetScale - scale) < 0.0005 &&
        Math.abs(targetLabelOpacity - labelOpacity) < 0.005

      frameId = settled ? 0 : requestAnimationFrame(frame)
    }

    function wake() {
      if (frameId) return
      last = performance.now()
      frameId = requestAnimationFrame(frame)
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      mouseX = event.clientX
      mouseY = event.clientY
      if (!seen) {
        seen = true
        x = mouseX
        y = mouseY
        root!.style.opacity = "1"
      }
      wake()
    }

    function onOver(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      resolve(event.target instanceof Element ? event.target : null)
      wake()
    }

    function onScroll() {
      if (!seen) return
      recheck = true
      wake()
    }

    function onLeave() {
      seen = false
      root!.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    html.addEventListener("pointerleave", onLeave)

    return () => {
      html.classList.remove("cursor-active")
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      window.removeEventListener("scroll", onScroll)
      html.removeEventListener("pointerleave", onLeave)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [finePointer])

  if (!finePointer) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-(--z-cursor) opacity-0 mix-blend-difference transition-opacity duration-300"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-white will-change-transform"
        style={{ width: BASE, height: BASE, transform: `translate(-50%, -50%) scale(${SIZE_DEFAULT / BASE})` }}
      />
      <span
        ref={labelRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[11px] font-medium tracking-[0.15em] whitespace-nowrap text-black uppercase opacity-0 select-none"
      />
    </div>
  )
}
