import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Box,
  Transition,
  Paper,
} from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { AccountControl } from "./AccountControl"
import { ActionsGroup } from "./ActionsGroup"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { SiteLanguageSelector } from "./SiteLanguageSelector"

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
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

const links: { label: string; href: string }[] = [
  { label: "home", href: "/" },
  { label: "tools", href: "/tools" },
]

export const PageHeader = () => {
  const [opened, setOpened] = useState(false)
  const { classes, cx } = useStyles()
  const { pathname } = useRouter()

  const { t } = useSiteTranslation()

  const items = links.map((link) => (
    <Link key={link.href} href={link.href} passHref>
      <Box
        component="a"
        className={cx(classes.link, { [classes.linkActive]: pathname === link.href })}
        onClick={() => {
          setOpened(false)
        }}
      >
        {t(`PageHeader.${link.label}`)}
      </Box>
    </Link>
  ))

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.header}>
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          className={classes.burger}
          size="sm"
        />
        MedReporter
        <Group spacing="sm" className={classes.links}>
          {items}
        </Group>
        <ActionsGroup>
          <ColorSchemeToggle />
          <SiteLanguageSelector />
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
