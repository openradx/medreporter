import { Box, Group } from "@mantine/core"
import { DimensionsInput } from "./DimensionsInput"
import { FollowUpToggle } from "./FollowUpToggle"
import { MeasurementsActions } from "./MeasurementsActions"
import { RowsInput } from "./RowsInput"
import { MeasurementsAction } from "./measurementsTypes"

interface ControlPanelProps {
  labels: {
    followUp: string
    rows: string
    dimensions: string
    clearAll: string
    clearReferences: string
    shiftCurrent: string
  }
  followUp: boolean
  rows: number
  dimensions: 1 | 2 | 3
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const ControlPanel = ({
  labels,
  followUp,
  rows,
  dimensions,
  dispatch,
  disabled,
}: ControlPanelProps) => (
  <Group spacing="lg" sx={{ marginLeft: 35 }}>
    <FollowUpToggle
      label={labels.followUp}
      followUp={followUp}
      dispatch={dispatch}
      disabled={disabled}
    />
    <RowsInput label={labels.rows} rows={rows} dispatch={dispatch} disabled={disabled} />
    <DimensionsInput
      label={labels.dimensions}
      dimensions={dimensions}
      dispatch={dispatch}
      disabled={disabled}
    />
    <Box sx={{ alignSelf: "center" }}>
      <MeasurementsActions labels={labels} dispatch={dispatch} disabled={disabled} />
    </Box>
  </Group>
)