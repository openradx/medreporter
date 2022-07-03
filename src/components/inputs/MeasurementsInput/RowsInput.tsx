import { memo } from "react"
import { NumberInput } from "../NumberInput"
import { MeasurementsAction } from "./measurementTypes"

const ROWS_MIN = 1
const ROWS_MAX = 20

interface RowsInputProps {
  label: string
  rows: number
  dispatch: (action: MeasurementsAction) => void
}

export const RowsInput = memo(({ label, rows, dispatch }: RowsInputProps) => (
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
    width={60}
  />
))
