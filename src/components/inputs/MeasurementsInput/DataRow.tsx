import { Box } from "@mantine/core"
import { Dimension, Dimensions, MeasurementsAction, MeasurementsRow } from "~/types/measurements"
import { NumberCell } from "./NumberCell"
import { TextCell } from "./TextCell"

interface DataRowProps {
  rowData: MeasurementsRow
  rowNumber: number
  followUp: boolean
  dimensions: Dimensions
  dispatch: (action: MeasurementsAction) => void
  disabled: boolean
}

export const DataRow = ({
  rowData,
  rowNumber,
  followUp,
  dimensions,
  dispatch,
  disabled,
}: DataRowProps) => (
  <tr>
    <Box component="th" sx={{ paddingRight: 5, textAlign: "right", minWidth: 30 }}>
      {rowNumber + 1}
    </Box>
    {followUp &&
      [...Array(dimensions)].map((_, index) => (
        <NumberCell
          key={index}
          rowNumber={rowNumber}
          type="previous"
          dimension={(index + 1) as Dimension}
          value={rowData.previous![index] ?? null}
          dispatch={dispatch}
          disabled={disabled}
        />
      ))}
    {[...Array(dimensions)].map((_, index) => (
      <NumberCell
        key={index}
        rowNumber={rowNumber}
        type="current"
        dimension={(index + 1) as Dimension}
        value={rowData.current[index]}
        dispatch={dispatch}
        disabled={disabled}
      />
    ))}
    <TextCell
      rowNumber={rowNumber}
      type="location"
      value={rowData.location}
      dispatch={dispatch}
      disabled={disabled}
    />
    <TextCell
      rowNumber={rowNumber}
      type="reference"
      value={rowData.reference}
      dispatch={dispatch}
      disabled={disabled}
    />
  </tr>
)
