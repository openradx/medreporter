import { ActionIcon, Menu } from "@mantine/core"
import { BsTools as ToolIcon } from "react-icons/bs"
import { MeasurementsAction } from "./measurementsTypes"

interface MeasurementsActionsProps {
  labels: {
    clearAll: string
    clearReferences: string
    shiftCurrent: string
  }
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const MeasurementsActions = ({ labels, dispatch, disabled }: MeasurementsActionsProps) => (
  <Menu>
    <Menu.Target>
      <ActionIcon title="Measurement tools" sx={{ marginTop: 20 }} disabled={disabled}>
        <ToolIcon />
      </ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item onClick={() => dispatch({ type: "clearAll" })}>{labels.clearAll}</Menu.Item>
      <Menu.Item onClick={() => dispatch({ type: "clearReferences" })}>
        {labels.clearReferences}
      </Menu.Item>
      <Menu.Item onClick={() => dispatch({ type: "shiftCurrent" })}>
        {labels.shiftCurrent}
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
)
