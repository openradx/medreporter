import { Box, Drawer, Stack } from "@mantine/core"
import cx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { Route } from "nextjs-routes"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import classes from "./NavDrawer.module.css"

interface NavDrawerProps {
  opened: boolean
  setOpened: (opened: boolean) => void
}

export const NavDrawer = ({ opened, setOpened }: NavDrawerProps) => {
  const { t } = useSiteTranslation()
  const { pathname } = useRouter()

  const linkData: { route: Route; label: string }[] = [
    { route: { pathname: "/" }, label: t("NavDrawer.home") },
    { route: { pathname: "/tools" }, label: t("NavDrawer.tools") },
  ]

  const links = linkData.map((link) => (
    <Link key={link.route.pathname} href={link.route} passHref legacyBehavior>
      <Box
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
      </Box>
    </Link>
  ))

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Navigation" padding="md">
      <Stack gap={4}>{links}</Stack>
    </Drawer>
  )
}
