import { Checkbox } from "@mantine/core"
import { memo } from "react"
import { MeasurementsAction } from "./measurementTypes"

interface FollowUpToggleProps {
  label: string
  followUp: boolean
  dispatch: (action: MeasurementsAction) => void
}

export const FollowUpToggle = memo(({ label, followUp, dispatch }: FollowUpToggleProps) => (
  <Checkbox
    label={label}
    checked={followUp}
    onChange={(event) => {
      dispatch({
        type: "changeFollowUp",
        hasPrevious: event.currentTarget.checked,
      })
    }}
    sx={{ marginTop: 20 }}
  />
))
