import { Anchor } from "@mantine/core"
import Link from "next/link"
import { Route } from "nextjs-routes"
import { ComponentProps, ReactNode } from "react"

interface PageLinkProps extends ComponentProps<typeof Anchor> {
  url: Route
  children: ReactNode
}

export const PageLink = ({ url, children, ...rest }: PageLinkProps) => (
  <Link href={url} passHref legacyBehavior>
    <Anchor {...rest} component="a">
      {children}
    </Anchor>
  </Link>
)
