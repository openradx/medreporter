import { memo } from "react"
import { Dimension, MeasurementsAction } from "~/types/measurements"
import { NumberInput } from "../NumberInput"

type MeasureType = "previous" | "current"

interface NumberCellProps {
  rowNumber: number
  type: MeasureType
  dimension: Dimension
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
