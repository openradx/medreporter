import { Routes } from "@blitzjs/next"
import { Box, createStyles, Drawer, Stack } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

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

  const links = [
    { url: Routes.ModulesPage(), label: t("Navbar.linkModules") },
    { url: Routes.ToolsPage(), label: t("Navbar.linkTools") },
  ].map((link) => (
    <Link key={link.url.pathname} href={link.url} passHref>
      <Box
        component="a"
        className={cx(classes.link, {
          [classes.linkActive]:
            link.url.pathname === "/"
              ? pathname === link.url.pathname
              : pathname.includes(link.url.pathname),
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
