import { Routes } from "@blitzjs/next"
import { Anchor, Burger, Container, Group, Header, Text } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { AccountControl } from "./AccountControl"
import { ActionsGroup } from "./ActionsGroup"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { NavDrawer } from "./NavDrawer"
import { SiteLanguageChooser } from "./SiteLanguageChooser"

const NAVBAR_HEIGHT = 60

export const Navbar = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Header height={NAVBAR_HEIGHT}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Group>
            <Burger opened={false} onClick={() => setOpened(!opened)} size="sm" />
            <Link href={Routes.HomePage()} passHref>
              <Anchor sx={{ "&:hover": { textDecoration: "none" } }}>
                <Text fw="bold" fz="xl">
                  MedReporter
                </Text>
              </Anchor>
            </Link>
          </Group>
          <Group id="navbar-group" spacing="sm" />
          <ActionsGroup>
            <ColorSchemeToggle />
            <SiteLanguageChooser />
            <AccountControl />
          </ActionsGroup>
        </Container>
      </Header>
      <NavDrawer opened={opened} setOpened={setOpened} />
    </>
  )
}
