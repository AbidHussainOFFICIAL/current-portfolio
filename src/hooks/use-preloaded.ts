"use client"

import { useSyncExternalStore } from "react"

import { preloaderStore } from "@/lib/preloader-store"

/** True once the preloader has finished (or was already shown earlier in this session). */
export function usePreloaded(): boolean {
  return useSyncExternalStore(
    preloaderStore.subscribe,
    preloaderStore.getSnapshot,
    preloaderStore.getServerSnapshot,
  )
}
