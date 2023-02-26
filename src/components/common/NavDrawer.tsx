import { Box, createStyles, Drawer, Stack } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { Route } from "nextjs-routes"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface NavDrawerProps {
  opened: boolean
  setOpened: (opened: boolean) => void
}

const useStyles = createStyles((theme) => ({
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}))

export const NavDrawer = ({ opened, setOpened }: NavDrawerProps) => {
  const { classes, cx } = useStyles()
  const { t } = useSiteTranslation()
  const { pathname } = useRouter()

  const linkData: { route: Route; label: string }[] = [
    { route: { pathname: "/" }, label: t("NavDrawer.home") },
    { route: { pathname: "/figures" }, label: t("NavDrawer.figures") },
    { route: { pathname: "/modules" }, label: t("NavDrawer.modules") },
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
      <Stack spacing={4}>{links}</Stack>
    </Drawer>
  )
}
