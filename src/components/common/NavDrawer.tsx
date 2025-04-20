import { useLingui } from "@lingui/react/macro"
import { Drawer, Stack, Text } from "@mantine/core"
import cx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { Route } from "nextjs-routes"
import classes from "./NavDrawer.module.css"

interface NavDrawerProps {
  opened: boolean
  setOpened: (opened: boolean) => void
}

export const NavDrawer = ({ opened, setOpened }: NavDrawerProps) => {
  const { t } = useLingui()
  const { pathname } = useRouter()

  const linkData: { route: Route; label: string }[] = [
    { route: { pathname: "/" }, label: t`Home` },
    { route: { pathname: "/templates" }, label: t`Templates` },
  ]

  const links = linkData.map((link) => (
    <Link key={link.route.pathname} href={link.route} passHref legacyBehavior>
      <Text
        component="a"
        className={cx(classes.link, {
          [classes.linkActive]:
            link.route.pathname === "/"
              ? pathname === link.route.pathname
              : pathname.includes(link.route.pathname),
        })}
        onClick={() => {
          setOpened(false)
        }}
      >
        {link.label}
      </Text>
    </Link>
  ))

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={t`Navigation`}
      padding="md"
      size="xs"
    >
      <Stack gap="sm">{links}</Stack>
    </Drawer>
  )
}
