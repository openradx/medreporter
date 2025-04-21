import { Trans } from "@lingui/react/macro"
import { Divider, Group } from "@mantine/core"
import { NavbarCenter } from "../common/NavbarCenter"
import { ToggleEditModeButton } from "../template/ToggleEditModeButton"
import { StatusIndicator } from "./StatusIndicator"
import { TemplatePropertiesButton } from "./TemplatePropertiesButton"

interface DesignerNavbarCenterProps {
  title: string
}

export const DesignerNavbarCenter = ({ title }: DesignerNavbarCenterProps) => (
  <NavbarCenter>
    <Group gap="xl">
      <StatusIndicator />
      <span>{title || <Trans>New Template</Trans>}</span>
      <Divider orientation="vertical" size="sm" />
      <ToggleEditModeButton />
      <Divider orientation="vertical" size="sm" />
      <TemplatePropertiesButton />
    </Group>
  </NavbarCenter>
)
