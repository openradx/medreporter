import { Checkbox } from "@mantine/core"
import { memo } from "react"
import { MeasurementsAction } from "~/types/measurements"

interface FollowUpToggleProps {
  label: string
  followUp: boolean
  dispatch: (action: MeasurementsAction) => void
  disabled?: boolean
}

export const FollowUpToggle = memo(
  ({ label, followUp, dispatch, disabled }: FollowUpToggleProps) => (
    <Checkbox
      label={label}
      checked={followUp}
      onChange={(event) => {
        dispatch({
          type: "changeFollowUp",
          hasPrevious: event.currentTarget.checked,
        })
      }}
      disabled={disabled}
      mt={20}
    />
  )
)
