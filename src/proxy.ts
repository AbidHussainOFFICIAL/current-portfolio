import { NextResponse, type NextRequest } from "next/server"

/**
 * Language routing (Next.js 16 "proxy", the renamed middleware).
 *
 * The app lives in src/app/[lang]. Visitors never see "/en":
 *  - "/work"      is served from "/en/work" (rewrite, the address bar stays "/work")
 *  - "/en/work"   redirects to "/work" (permanent), so there is one address per page
 *  - "/ur/work"   is served as it is
 *
 * Files with an extension (/feed.xml, /icon.svg, images, fonts) and the generated icon and share-image
 * routes are skipped by the matcher below and never reach this function.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Generated share images keep their "/en" address: crawlers get the file directly instead of a redirect.
  if (pathname.endsWith("/opengraph-image") || pathname.includes("/opengraph-image-")) {
    if (pathname === "/en" || pathname.startsWith("/en/") || pathname.startsWith("/ur/")) return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    return NextResponse.rewrite(url)
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    return NextResponse.redirect(url, 308)
  }

  if (pathname === "/ur" || pathname.startsWith("/ur/")) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next.js internals, API routes, anything with a file extension and the root metadata image routes.
  matcher: ["/((?!_next/|api/|.*\\..*|apple-icon|icon|opengraph-image$|opengraph-image-).*)"],
}
