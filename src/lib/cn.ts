import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The custom font-size tokens from globals.css (text-row, text-heading, ...) must be known to
// tailwind-merge, otherwise it mistakes them for colours and drops one when a real colour is set.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["hero", "section", "heading", "title", "statement", "row", "numeral", "lead", "body", "small", "label"],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
