import { Box } from "@mantine/core"
import { NumberCell } from "./NumberCell"
import { TextCell } from "./TextCell"
import { MeasurementsAction } from "./measurementTypes"

export type MeasureValues =
  | [number | null]
  | [number | null, number | null]
  | [number | null, number | null, number | null]

export type MeasurementsRow = {
  previous?: MeasureValues
  current: MeasureValues
  location: string
  reference: string
}

interface DataRowProps {
  rowData: MeasurementsRow
  rowNumber: number
  followUp: boolean
  dimensions: 1 | 2 | 3
  dispatch: (action: MeasurementsAction) => void
}

export const DataRow = ({ rowData, rowNumber, followUp, dimensions, dispatch }: DataRowProps) => (
  <tr>
    <Box component="th" sx={{ paddingRight: 5, textAlign: "right", minWidth: 30 }}>
      {rowNumber + 1}
    </Box>
    {followUp &&
      [...Array(dimensions)].map((_, dimension) => (
        <NumberCell
          key={dimension}
          rowNumber={rowNumber}
          type="previous"
          dimension={dimension as 0 | 1 | 2}
          value={rowData.previous![dimension] ?? null}
          dispatch={dispatch}
        />
      ))}
    {[...Array(dimensions)].map((_, dimension) => (
      <NumberCell
        key={dimension}
        rowNumber={rowNumber}
        type="current"
        dimension={dimension as 0 | 1 | 2}
        value={rowData.current[dimension]}
        dispatch={dispatch}
      />
    ))}
    <TextCell rowNumber={rowNumber} type="location" value={rowData.location} dispatch={dispatch} />
    <TextCell
      rowNumber={rowNumber}
      type="reference"
      value={rowData.reference}
      dispatch={dispatch}
    />
  </tr>
)
