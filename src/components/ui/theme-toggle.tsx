"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"

import { useDictionary } from "@/i18n/locale-provider"
import { themeStore } from "@/lib/theme"

/**
 * Light / dark switch. The page starts in the system theme; a click saves an explicit choice.
 * Which icon shows is decided in CSS (.theme-sun / .theme-moon), so it is right on first paint.
 */
export function ThemeToggle() {
  const dict = useDictionary()
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, themeStore.getServerSnapshot)

  return (
    <button
      type="button"
      data-cursor=""
      aria-label={theme === "dark" ? dict.preferences.switchToLight : dict.preferences.switchToDark}
      onClick={() => themeStore.set(theme === "dark" ? "light" : "dark")}
      className="icon-btn"
    >
      <Sun className="theme-sun size-5" aria-hidden />
      <Moon className="theme-moon size-5" aria-hidden />
    </button>
  )
}
