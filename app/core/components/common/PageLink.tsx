import { Anchor } from "@mantine/core"
import { RouteUrlObject } from "blitz"
import Link from "next/link"
import { ComponentProps, ReactNode } from "react"

interface PageLinkProps extends ComponentProps<typeof Anchor> {
  route: RouteUrlObject
  children: ReactNode
}

export const PageLink = ({ route, children, ...rest }: PageLinkProps) => (
  <Link href={route} legacyBehavior passHref>
    <Anchor {...rest} component="a">
      {children}
    </Anchor>
  </Link>
)
