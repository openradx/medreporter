import { Box } from "@mantine/core"
import { ReactElement } from "react"
import { checkDataRowEmpty, getMeasurementsDataParams } from "../../utils/measurementUtils"
import { MeasurementsData, MeasurementsRow } from "../inputs/MeasurementsInput/measurementTypes"

const MULTIPLICATOR = " x "

const createTableHeader = (
  followUp: boolean,
  previousLabel: string,
  currentLabel: string,
  locationLabel: string,
  referenceLabel: string
) => (
  <thead>
    <tr>
      {followUp && <th>{previousLabel}</th>}
      <th>{currentLabel}</th>
      <th>{locationLabel}</th>
      <th>{referenceLabel}</th>
    </tr>
  </thead>
)

const createMeasureCellRow = (data: MeasurementsRow) => {
  const measureCells: ReactElement[] = []
  for (const measureType of ["previous", "current"] as const) {
    const values = data[measureType]
    if (values === undefined) {
      continue
    }
    const measureText = values.filter((v) => v != null).join(MULTIPLICATOR)
    measureCells.push(
      <Box
        key={measureType}
        component="td"
        sx={{
          border: "1px solid black",
        }}
      >
        {measureText}
      </Box>
    )
  }
  return <>{measureCells}</>
}

const createDescriptionCellRow = (data: MeasurementsRow) => {
  const descriptionCells: ReactElement[] = []
  for (const descriptionType of ["location", "reference"] as const) {
    const value = data[descriptionType]
    descriptionCells.push(
      <Box
        key={descriptionType}
        component="td"
        sx={{
          border: "1px solid black",
        }}
      >
        {value}
      </Box>
    )
  }
  return <>{descriptionCells}</>
}
const createTableRow = (data: MeasurementsRow, rowIndex: number) => (
  <tr key={rowIndex}>
    {createMeasureCellRow(data)}
    {createDescriptionCellRow(data)}
  </tr>
)

const createTableBody = (data: MeasurementsData) => {
  const rows: ReactElement[] = []
  data.forEach((rowData, index) => {
    if (!checkDataRowEmpty(rowData)) {
      rows.push(createTableRow(rowData, index))
    }
  })
  return <tbody>{rows}</tbody>
}

const createTableFooter = (followUp: boolean, stats: string) => {
  const colspan = followUp ? 4 : 3

  return (
    <tfoot>
      <tr>
        <td colSpan={colspan}>{stats}</td>
      </tr>
    </tfoot>
  )
}

interface MeasurementsTableHtmlProps {
  data: MeasurementsData
  stats: string
  tableLabel: string
  previousLabel: string
  currentLabel: string
  locationLabel: string
  referenceLabel: string
}

export const MeasurementsHtmlOutput = ({
  data,
  stats,
  tableLabel,
  previousLabel,
  currentLabel,
  locationLabel,
  referenceLabel,
}: MeasurementsTableHtmlProps) => {
  const { followUp } = getMeasurementsDataParams(data)

  return (
    <table
      style={{
        border: "1px solid black",
        borderCollapse: "collapse",
      }}
    >
      <Box component="caption" sx={{ textAlign: "left" }}>
        {tableLabel}
      </Box>
      {createTableHeader(followUp, previousLabel, currentLabel, locationLabel, referenceLabel)}
      {createTableBody(data)}
      {createTableFooter(followUp, stats)}
    </table>
  )
}
