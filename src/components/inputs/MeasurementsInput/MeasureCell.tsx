import { memo } from "react"
import { NumberInput } from "../NumberInput"
import { MeasurementsAction } from "./measurementTypes"

type MeasureType = "previous" | "current"

interface MeasureCellProps {
  rowNumber: number
  type: MeasureType
  dimension: 0 | 1 | 2
  value: number | null
  dispatch: (action: MeasurementsAction) => void
}

export const MeasureCell = memo(
  ({ rowNumber, type, dimension, value, dispatch }: MeasureCellProps) => (
    <td>
      <NumberInput
        min={0}
        max={9999}
        onChange={(newValue) => {
          dispatch({
            type: "changeMeasureCell",
            row: rowNumber,
            measureType: type,
            dimension,
            value: newValue,
          })
        }}
        value={value}
        width={70}
        autoHideControls
      />
    </td>
  )
)
