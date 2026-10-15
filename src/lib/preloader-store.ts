const KEY = "preloaded"

const listeners = new Set<() => void>()

/** Inline script for <head>: lets CSS hide the preloader before React loads. */
export const PRELOADER_SCRIPT = `try{if(sessionStorage.getItem("${KEY}")==="1"){document.documentElement.setAttribute("data-preloaded","")}}catch(e){}`

export const preloaderStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot(): boolean {
    try {
      return sessionStorage.getItem(KEY) === "1"
    } catch {
      // Storage blocked: skip the preloader instead of showing it on every page.
      return true
    }
  },
  getServerSnapshot(): boolean {
    return false
  },
  markDone() {
    try {
      sessionStorage.setItem(KEY, "1")
    } catch {
      // Ignore: the snapshot already returns true when storage is blocked.
    }
    listeners.forEach((listener) => listener())
  },
}
