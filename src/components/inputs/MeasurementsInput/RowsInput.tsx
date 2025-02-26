import { memo } from "react"
import { MeasurementsAction } from "~/types/measurements"
import { NumberInput } from "../NumberInput"

const ROWS_MIN = 1
const ROWS_MAX = 20

interface RowsInputProps {
  label: string
  rows: number
  dispatch: (action: MeasurementsAction) => void
  disabled?: boolean
}

export const RowsInput = memo(({ label, rows, dispatch, disabled }: RowsInputProps) => (
  <NumberInput
    label={label}
    min={ROWS_MIN}
    max={ROWS_MAX}
    value={rows}
    onChange={(newRows) => {
      if (newRows === null) newRows = rows
      if (newRows < ROWS_MIN) newRows = ROWS_MIN
      if (newRows > ROWS_MAX) newRows = ROWS_MAX

      dispatch({
        type: "changeRows",
        rows: newRows,
      })
    }}
    disabled={disabled}
    width={80}
    size="xs"
  />
))
