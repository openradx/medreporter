import { Box, Table } from "@mantine/core"
import { ReactElement } from "react"
import { checkDataRowEmpty, getMeasurementsDataParams } from "../../utils/measurementsUtils"
import { MeasurementsData, MeasurementsRow } from "../inputs/MeasurementsInput/measurementsTypes"

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
    measureCells.push(<td key={measureType}>{measureText}</td>)
  }
  return <>{measureCells}</>
}

const createDescriptionCellRow = (data: MeasurementsRow) => {
  const descriptionCells: ReactElement[] = []
  for (const descriptionType of ["location", "reference"] as const) {
    const value = data[descriptionType]
    descriptionCells.push(<td key={descriptionType}>{value}</td>)
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

const createTableFooter = (stats: string) => (
  <tfoot>
    <tr>
      <th colSpan={8}>{stats}</th>
    </tr>
  </tfoot>
)

interface MeasurementsTableHtmlProps {
  data: MeasurementsData
  stats: string
  label: string
  labels: {
    previous: string
    current: string
    location: string
    reference: string
  }
}

export const MeasurementsOutputHtml = ({
  data,
  stats,
  label,
  labels,
}: MeasurementsTableHtmlProps) => {
  const { followUp } = getMeasurementsDataParams(data)

  return (
    <Table>
      <Box component="caption" sx={{ textAlign: "left" }}>
        {label}
      </Box>
      {createTableHeader(
        followUp,
        labels.previous,
        labels.current,
        labels.location,
        labels.reference
      )}
      {createTableBody(data)}
      {createTableFooter(stats)}
    </Table>
  )
}
