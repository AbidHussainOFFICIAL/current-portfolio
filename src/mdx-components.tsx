import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

type AnchorProps = ComponentPropsWithoutRef<"a">

function MdxLink({ href = "", children, ...rest }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#")

  if (isInternal) {
    return (
      <Link href={href} className="link-sweep" {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-sweep" {...rest}>
      {children}
    </a>
  )
}

// Article typography is styled by the .prose-journal class in globals.css.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MdxLink,
    ...components,
  }
}
