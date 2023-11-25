import { Burger, Group, AppShell, Text } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { AccountControl } from "./AccountControl"
import { ActionsGroup } from "./ActionsGroup"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { NavDrawer } from "./NavDrawer"
import { SiteLanguageChooser } from "./SiteLanguageChooser"

interface NavBarProps {
  withoutAccountControl?: boolean
}

export const Navbar = ({ withoutAccountControl }: NavBarProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <AppShell.Header>
        <Group align="center" justify="space-between" h="100%" px="md">
          <Group>
            <Burger
              opened={false}
              title={t("Navbar.openMainMenuTitle")}
              onClick={() => setOpened(!opened)}
              size="sm"
            />
            <Link href="/" legacyBehavior>
              <Text fw={500} fz="xl" style={{ userSelect: "none", cursor: "pointer" }}>
                MedReporter
              </Text>
            </Link>
          </Group>
          <Group id="navbar-actions" gap="sm" />
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
