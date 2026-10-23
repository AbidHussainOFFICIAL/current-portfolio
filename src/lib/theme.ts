export type Theme = "light" | "dark"

const KEY = "theme"

/**
 * Inline script for <head>. Sets data-theme on <html> before the first paint, from the saved choice
 * or, when there is none, from the system setting. There is no third option: light or dark.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}`

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

/** External store for useSyncExternalStore. The truth is the data-theme attribute on <html>. */
export const themeStore = {
  subscribe(listener: () => void) {
    const observer = new MutationObserver(listener)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })

    // Without a saved choice the page follows the system, also while it is open.
    const query = window.matchMedia("(prefers-color-scheme: light)")
    function onSystemChange() {
      if (savedTheme() === null) document.documentElement.setAttribute("data-theme", systemTheme())
    }
    query.addEventListener("change", onSystemChange)

    return () => {
      observer.disconnect()
      query.removeEventListener("change", onSystemChange)
    }
  },
  getSnapshot(): Theme {
    const value = document.documentElement.getAttribute("data-theme")
    return value === "light" || value === "dark" ? value : systemTheme()
  },
  getServerSnapshot(): Theme {
    return "dark"
  },
  /** Applies a theme and remembers it. */
  set(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // Storage blocked: the theme still changes for this visit.
    }
  },
}
