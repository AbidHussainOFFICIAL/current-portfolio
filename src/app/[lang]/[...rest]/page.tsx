import { notFound } from "next/navigation"

/**
 * Any address that matches no page ends here, so the 404 page is drawn inside the language layout
 * (header, footer, fonts and direction) instead of as a bare default page.
 */
export default function CatchAll() {
  notFound()
}
