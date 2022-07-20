import { memo } from "react"
import { NumberInput } from "../NumberInput"
import { MeasurementsAction } from "./measurementsTypes"

type MeasureType = "previous" | "current"

interface NumberCellProps {
  rowNumber: number
  type: MeasureType
  dimension: 0 | 1 | 2
  value: number | null
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const NumberCell = memo(
  ({ rowNumber, type, dimension, value, dispatch, disabled }: NumberCellProps) => (
    <td>
      <NumberInput
        min={0}
        max={9999}
        onChange={(newValue) => {
          dispatch({
            type: "changeNumberValue",
            row: rowNumber,
            measureType: type,
            dimension,
            value: newValue,
          })
        }}
        value={value}
        disabled={disabled}
        width={70}
        autoHideControls
      />
    </td>
  )
)