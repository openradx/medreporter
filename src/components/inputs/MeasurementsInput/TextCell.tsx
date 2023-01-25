import { memo } from "react"
import { MeasurementsAction } from "~/types/measurements"
import { SingleLineInput } from "../SingleLineInput"

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
