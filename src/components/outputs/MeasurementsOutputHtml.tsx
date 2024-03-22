import { ReactElement } from "react"
import { MeasurementsData, MeasurementsRow } from "~/schemas/structure"
import { checkDataRowEmpty, getMeasurementsDataParams } from "~/utils/measurementsUtils"

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
      {followUp && <th style={{ width: "25%", wordWrap: "break-word" }}>{previousLabel}</th>}
      <th style={{ width: followUp ? "25%" : "1/3", wordWrap: "break-word" }}>{currentLabel}</th>
      <th style={{ width: followUp ? "25%" : "1/3", wordWrap: "break-word" }}>{locationLabel}</th>
      <th style={{ width: followUp ? "25%" : "1/3", wordWrap: "break-word" }}>{referenceLabel}</th>
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
      <td key={measureType} style={{ wordWrap: "break-word" }}>
        {measureText}
      </td>
    )
  }
  return <>{measureCells}</>
}

const createDescriptionCellRow = (data: MeasurementsRow) => {
  const descriptionCells: ReactElement[] = []
  for (const descriptionType of ["location", "reference"] as const) {
    const value = data[descriptionType]
    descriptionCells.push(
      <td key={descriptionType} style={{ wordWrap: "break-word" }}>
        {value}
      </td>
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

const createTableFooter = (stats: string) => (
  <tfoot>
    <tr>
      <th>{stats}</th>
    </tr>
  </tfoot>
)

interface MeasurementsTableHtmlProps {
  data: MeasurementsData
  legend: string
  labels: {
    previous: string
    current: string
    location: string
    reference: string
  }
  stats: string
}

export const MeasurementsOutputHtml = ({
  data,
  legend,
  labels,
  stats,
}: MeasurementsTableHtmlProps) => {
  const { followUp } = getMeasurementsDataParams(data)

  return (
    <table style={{ width: "100%", tableLayout: "fixed" }}>
      {createTableHeader(
        followUp,
        labels.previous,
        labels.current,
        labels.location,
        labels.reference
      )}
      {createTableBody(data)}
      {createTableFooter(stats)}
      <legend>{legend}</legend>
    </table>
  )
}
