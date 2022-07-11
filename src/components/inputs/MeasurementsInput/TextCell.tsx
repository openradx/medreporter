import { memo } from "react"
import { SingleLineInput } from "../SingleLineInput"
import { MeasurementsAction } from "./measurementTypes"

type textType = "location" | "reference"

interface TextCellProps {
  rowNumber: number
  type: textType
  value: string
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const TextCell = memo(({ rowNumber, type, value, dispatch, disabled }: TextCellProps) => (
  <td>
    <SingleLineInput
      value={value}
      onChange={(newValue) => {
        dispatch({
          type: "changeTextValue",
          rowNumber,
          textType: type,
          value: newValue,
        })
      }}
      disabled={disabled}
      width={200}
    />
  </td>
))
