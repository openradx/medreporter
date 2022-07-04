import { ActionIcon, Menu } from "@mantine/core"
import { BsTools as ToolIcon } from "react-icons/bs"

interface MeasurementsToolboxProps {
  labels?: {
    clearAll: string
    shiftCurrent: string
  }
}

export const MeasurementsToolbox = ({
  labels = {
    clearAll: "Clear all",
    shiftCurrent: "Shirt current to previous",
  },
}: MeasurementsToolboxProps) => (
  <Menu>
    <Menu.Target>
      <ActionIcon>
        <ToolIcon />
      </ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item>{labels.clearAll}</Menu.Item>
      <Menu.Item>{labels.shiftCurrent}</Menu.Item>
    </Menu.Dropdown>
  </Menu>
)
