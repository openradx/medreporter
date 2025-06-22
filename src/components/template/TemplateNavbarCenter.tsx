import { Divider, Group } from "@mantine/core"
import { NavbarCenter } from "../common/NavbarCenter"
import { ViewModeToggle } from "../designer/ViewModeToggle"
import { ToggleEditModeButton } from "./ToggleEditModeButton"

interface TemplateNavbarCenterProps {
  title: string
  isOwnTemplate: boolean
}

export const TemplateNavbarCenter = ({ title, isOwnTemplate }: TemplateNavbarCenterProps) => (
  <NavbarCenter>
    <Group gap="xl">
      <span>{title}</span>
      <Divider orientation="vertical" size="sm" />
      <ViewModeToggle />
      {isOwnTemplate && (
        <>
          <Divider orientation="vertical" size="sm" />
          <ToggleEditModeButton />
        </>
      )}
    </Group>
  </NavbarCenter>
)
