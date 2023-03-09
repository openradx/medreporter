import { Burger, Group, Header, Text } from "@mantine/core"
import { useState } from "react"
import { NAVBAR_HEIGHT } from "~/constants"
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
      <Header height={NAVBAR_HEIGHT}>
        <Group align="center" position="apart" h="100%" px="md">
          <Group>
            <Burger
              opened={false}
              title={t("Navbar.openMainMenuTitle")}
              onClick={() => setOpened(!opened)}
              size="sm"
            />
            <Text fw={500} fz="xl" sx={{ userSelect: "none" }}>
              MedReporter
            </Text>
          </Group>
          <Group id="navbar-actions" spacing="sm" />
          <ActionsGroup>
            <ColorSchemeToggle />
            <SiteLanguageChooser />
            {!withoutAccountControl && <AccountControl />}
          </ActionsGroup>
        </Group>
      </Header>
      <NavDrawer opened={opened} setOpened={setOpened} />
    </>
  )
}
