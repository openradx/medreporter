import { Divider, Group } from "@mantine/core"
import { NavbarCenter } from "../common/NavbarCenter"
import { ToggleEditModeButton } from "./ToggleEditModeButton"

interface TemplateNavbarCenterProps {
  title: string
  isOwnTemplate: boolean
}

export const TemplateNavbarCenter = ({ title, isOwnTemplate }: TemplateNavbarCenterProps) => (
  <NavbarCenter>
    <Group gap="xl">
      <span>{title}</span>
      {isOwnTemplate && (
        <>
          <Divider orientation="vertical" size="sm" />
          <ToggleEditModeButton />
        </>
      )}
    </Group>
  </NavbarCenter>
)
