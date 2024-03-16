import { memo } from "react"
import { Dimensions, MeasurementsAction } from "~/types/measurements"
import { NumberInput } from "../NumberInput"

const DIMENSIONS_MIN = 1
const DIMENSIONS_MAX = 3

interface DimensionsInputProps {
  label: string
  dimensions: Dimensions
  dispatch: (action: MeasurementsAction) => void
  disabled?: boolean
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
          dimensions: newDimensions as Dimensions,
        })
      }}
      disabled={disabled}
      width={80}
      size="xs"
    />
  )
)
