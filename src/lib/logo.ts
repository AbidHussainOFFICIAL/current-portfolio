/**
 * Paths of the "AH" monogram on a 64 x 64 grid, drawn as shapes so no font is needed.
 * The same geometry is repeated in src/app/icon.svg, which must be a static file.
 */

/** The letters A and H. With fill-rule evenodd the small triangle inside the A stays a counter. */
export const LOGO_LETTERS =
  "M6 52 15.5 12h7L32 52h-7l-1.8-8H14.8L13 52ZM19 26.7 21.7 38h-5.4ZM38 12h7v16.5h6V12h7v40h-7V35.5h-6V52h-7Z"

/** Rounded square behind the letters. */
export const LOGO_FRAME =
  "M14 0h36a14 14 0 0 1 14 14v36a14 14 0 0 1-14 14H14A14 14 0 0 1 0 50V14A14 14 0 0 1 14 0Z"

/** The full app mark: mint gradient square, ink letters. Used where a static SVG file is not possible. */
export const LOGO_MARK_GRADIENT = ["#8CFFE0", "#1FB88F"] as const
