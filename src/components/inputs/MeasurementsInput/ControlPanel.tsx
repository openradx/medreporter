import { Group } from "@mantine/core"
import { DimensionsInput } from "./DimensionsInput"
import { FollowUpToggle } from "./FollowUpToggle"
import { RowsInput } from "./RowsInput"
import { MeasurementsAction } from "./measurementTypes"

interface ControlPanelProps {
  labels: {
    followUp: string
    rows: string
    dimensions: string
  }
  followUp: boolean
  rows: number
  dimensions: 1 | 2 | 3
  dispatch: (action: MeasurementsAction) => void
}

export const ControlPanel = ({
  labels,
  followUp,
  rows,
  dimensions,
  dispatch,
}: ControlPanelProps) => (
  <Group spacing="lg" sx={{ alignItems: "flex-start" }}>
    <FollowUpToggle label={labels.followUp} followUp={followUp} dispatch={dispatch} />
    <RowsInput label={labels.rows} rows={rows} dispatch={dispatch} />
    <DimensionsInput label={labels.dimensions} dimensions={dimensions} dispatch={dispatch} />
  </Group>
)
