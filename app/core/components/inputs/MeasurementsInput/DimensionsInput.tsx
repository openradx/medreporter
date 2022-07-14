import { memo } from "react"
import { NumberInput } from "../NumberInput"
import { MeasurementsAction } from "./measurementsTypes"

const DIMENSIONS_MIN = 1
const DIMENSIONS_MAX = 3

interface DimensionsInputProps {
  label: string
  dimensions: 1 | 2 | 3
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const DimensionsInput = memo(
  ({ label, dimensions, dispatch, disabled }: DimensionsInputProps) => (
    <NumberInput
      label={label}
      min={DIMENSIONS_MIN}
      max={DIMENSIONS_MAX}
      value={dimensions}
      onChange={(newDimensions) => {
        if (newDimensions === null) newDimensions = dimensions
        if (newDimensions < DIMENSIONS_MIN) newDimensions = DIMENSIONS_MIN
        if (newDimensions > DIMENSIONS_MAX) newDimensions = DIMENSIONS_MAX

        dispatch({
          type: "changeDimensions",
          dimensions: newDimensions as 1 | 2 | 3,
        })
      }}
      disabled={disabled}
      width={60}
    />
  )
)
