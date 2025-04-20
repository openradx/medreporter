import { useLingui } from "@lingui/react/macro"
import { ActionIcon, Menu } from "@mantine/core"
import { Wrench as ToolIcon } from "lucide-react"
import { MeasurementsAction } from "~/types/measurements"

interface MeasurementsActionsProps {
  labels: {
    clearAll: string
    clearReferences: string
    shiftCurrent: string
  }
  dispatch: (action: MeasurementsAction) => void
  disabled?: boolean
}

export const MeasurementsActions = ({ labels, dispatch, disabled }: MeasurementsActionsProps) => {
  const { t } = useLingui()

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon title={t`Measurement actions`} disabled={disabled} size={30}>
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
}
