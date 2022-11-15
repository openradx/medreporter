import { Routes } from "@blitzjs/next"
import {
  Anchor,
  Box,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  Transition,
} from "@mantine/core"
import { RouteUrlObject } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { AccountControl } from "./AccountControl"
import { ActionsGroup } from "./ActionsGroup"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { SiteLanguageChooser } from "./SiteLanguageChooser"

const NAVBAR_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

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

interface NavLink {
  url: RouteUrlObject
  label: string
}

export const Navbar = () => {
  const [opened, setOpened] = useState(false)
  const { classes, cx } = useStyles()
  const { pathname } = useRouter()
  const { t } = useSiteTranslation()

  const links: NavLink[] = [
    { url: Routes.ModulesPage(), label: t("Navbar.linkModules") },
    { url: Routes.ToolsPage(), label: t("Navbar.linkTools") },
  ]

  const isCurrentPath = (link: NavLink) => {
    if (link.url.pathname === "/") {
      return pathname === link.url.pathname
    }
    return pathname.includes(link.url.pathname)
  }

  const items = links.map((link) => (
    <Link key={link.url.pathname} href={link.url} passHref>
      <Box
        component="a"
        className={cx(classes.link, {
          [classes.linkActive]: isCurrentPath(link),
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
    <Header height={NAVBAR_HEIGHT}>
      <Container className={classes.header}>
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          className={classes.burger}
          size="sm"
        />
        <Link href={Routes.HomePage()} passHref>
          <Anchor sx={{ "&:hover": { textDecoration: "none" } }}>MedReporter</Anchor>
        </Link>
        <Group spacing="sm" className={classes.links}>
          {items}
        </Group>
        <ActionsGroup>
          <ColorSchemeToggle />
          <SiteLanguageChooser />
          <AccountControl />
        </ActionsGroup>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
