import { useLingui } from "@lingui/react/macro"
import { Burger, Group, AppShell, Text } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { appConfig } from "~/appConfig"
import logo from "~/images/logo.png"
import { AccountControl } from "./AccountControl"
import { ActionsGroup } from "./ActionsGroup"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { NavDrawer } from "./NavDrawer"
import classes from "./Navbar.module.css"
import { SiteLanguageChooser } from "./SiteLanguageChooser"

export const NAVBAR_CENTER_ID = "navbar-center"

interface NavBarProps {
  withoutAccountControl?: boolean
}

export const Navbar = ({ withoutAccountControl }: NavBarProps) => {
  const { t } = useLingui()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <AppShell.Header>
        <Group align="center" justify="space-between" h="100%" px="md">
          <Group>
            <Burger
              opened={false}
              title={t`Open main menu`}
              onClick={() => setOpened(!opened)}
              size="sm"
            />
            <Image src={logo} alt="Logo" width={32} height={32} />
            <Link href="/" className={classes.legacyLink}>
              <Text fw={500} fz="xl" style={{ userSelect: "none", cursor: "pointer" }}>
                {appConfig.medreporterTitle}
              </Text>
            </Link>
          </Group>
          <Group id={NAVBAR_CENTER_ID} gap="sm" />
          <ActionsGroup>
            <ColorSchemeToggle />
            <SiteLanguageChooser />
            {!withoutAccountControl && <AccountControl />}
          </ActionsGroup>
        </Group>
      </AppShell.Header>
      <NavDrawer opened={opened} setOpened={setOpened} />
    </>
  )
}
