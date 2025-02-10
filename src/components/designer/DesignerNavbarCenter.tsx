import { Divider, Group } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarCenter } from "../common/NavbarCenter"
import { ToggleEditModeButton } from "../template/ToggleEditModeButton"
import { SyncingStateDisplay } from "./SyncingStateDisplay"
import { TemplatePropertiesButton } from "./TemplatePropertiesButton"

interface DesignerNavbarCenterProps {
  title: string
}

export const DesignerNavbarCenter = ({ title }: DesignerNavbarCenterProps) => {
  const { t } = useSiteTranslation()

  return (
    <NavbarCenter>
      <Group gap="xl">
        <SyncingStateDisplay />
        <span>{title || t("NewTemplate.navbarTitle")}</span>
        <Divider orientation="vertical" size="sm" />
        <ToggleEditModeButton />
        <Divider orientation="vertical" size="sm" />
        <TemplatePropertiesButton />
      </Group>
    </NavbarCenter>
  )
}
