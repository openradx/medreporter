import { Group } from "@mantine/core"
import { NavbarCenter } from "../common/NavbarCenter"
import { PreviewSwitch } from "./PreviewSwitch"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => (
  <>
    <NavbarCenter>
      <Group gap="xl">
        <span>New Template</span>
        <PreviewSwitch />
      </Group>
    </NavbarCenter>
    <TemplateDesigner />
  </>
)
