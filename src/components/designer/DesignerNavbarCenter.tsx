import { Divider, Group } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarCenter } from "../common/NavbarCenter"
import { ToggleEditModeButton } from "../template/ToggleEditModeButton"
import { StatusIndicator } from "./StatusIndicator"
import { TemplatePropertiesButton } from "./TemplatePropertiesButton"

interface DesignerNavbarCenterProps {
  title: string
}

export const DesignerNavbarCenter = ({ title }: DesignerNavbarCenterProps) => {
  const { t } = useSiteTranslation()

  return (
    <NavbarCenter>
      <Group gap="xl">
        <StatusIndicator />
        <span>{title || t("NewTemplate.navbarTitle")}</span>
        <Divider orientation="vertical" size="sm" />
        <ToggleEditModeButton />
        <Divider orientation="vertical" size="sm" />
        <TemplatePropertiesButton />
      </Group>
    </NavbarCenter>
  )
}
