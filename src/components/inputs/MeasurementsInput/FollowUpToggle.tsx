import { Checkbox } from "@mantine/core"
import { memo } from "react"
import { MeasurementsAction } from "./measurementTypes"

interface FollowUpToggleProps {
  label: string
  followUp: boolean
  dispatch: (action: MeasurementsAction) => void
}

export const FollowUpToggle = memo(({ label, followUp, dispatch }: FollowUpToggleProps) => (
  <Checkbox.Group
    label={label}
    value={followUp ? ["followUp"] : []}
    onChange={(newValue) => {
      const checked = newValue[0] === "followUp"
      dispatch({
        type: "changeFollowUp",
        hasPrevious: checked,
      })
    }}
  >
    <Checkbox value="followUp" checked={followUp} />
  </Checkbox.Group>
))
