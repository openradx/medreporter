import { ActionIcon, Menu } from "@mantine/core"
import { BsTools as ToolIcon } from "react-icons/bs"
import { MeasurementsAction } from "./measurementTypes"

interface MeasurementsActionsProps {
  labels: {
    clearAll: string
    shiftCurrent: string
  }
  dispatch: (action: MeasurementsAction) => void
}

export const MeasurementsActions = ({ labels, dispatch }: MeasurementsActionsProps) => (
  <Menu>
    <Menu.Target>
      <ActionIcon title="Measurement tools" sx={{ marginTop: 20 }}>
        <ToolIcon />
      </ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item onClick={() => dispatch({ type: "clearAll" })}>{labels.clearAll}</Menu.Item>
      <Menu.Item onClick={() => dispatch({ type: "shiftCurrent" })}>
        {labels.shiftCurrent}
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
)
