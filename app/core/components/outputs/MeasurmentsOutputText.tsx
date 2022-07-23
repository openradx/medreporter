import { checkDataRowEmpty, getMeasurementsDataParams } from "../../utils/measurementsUtils"
import { MeasurementsData, MeasurementsRow } from "../inputs/MeasurementsInput/measurementsTypes"

const NEWLINE_CHAR = "\n"
const DELIMITER = " "
const MULTIPLICATOR = "x"

type ColSizes = {
  previous: number
  current: number
  location: number
  reference: number
}

const calcColSizes = (
  data: MeasurementsData,
  previousLabel: string,
  currentLabel: string,
  locationLabel: string,
  referenceLabel: string
): ColSizes => {
  const colSizes = {
    previous: previousLabel.length,
    current: currentLabel.length,
    location: locationLabel.length,
    reference: referenceLabel.length,
  }

  data.forEach((rowData) => {
    for (const measureType of ["previous", "current"] as const) {
      const values = rowData[measureType]
      if (values === undefined) {
        continue
      }
      const measureText = values.filter((v) => v !== undefined).join(MULTIPLICATOR)
      const { length } = measureText
      if (!(measureType in colSizes) || length > colSizes[measureType]) {
        colSizes[measureType] = length
      }
    }
    for (const type of ["location", "reference"] as const) {
      const descriptionText: string = rowData[type]
      let length = 0
      if (descriptionText != null) length = descriptionText.toString().length
      if (!(type in colSizes) || length > colSizes[type]) {
        colSizes[type] = length
      }
    }
  })

  return colSizes
}

const createTableHeader = (
  colSizes: ColSizes,
  followUp: boolean,
  previousLabel: string,
  currentLabel: string,
  locationLabel: string,
  referenceLabel: string
) => {
  let header: string = ""

  if (followUp) {
    header && (header += DELIMITER)
    header += previousLabel.padEnd(colSizes.previous)
  }

  header && (header += DELIMITER)
  header += currentLabel.padEnd(colSizes.current)

  header && (header += DELIMITER)
  header += locationLabel.padEnd(colSizes.location)

  header && (header += DELIMITER)
  header += referenceLabel.padEnd(colSizes.reference)

  return header
}

const createMeasureCellRow = (data: MeasurementsRow, colSizes: ColSizes, followUp: boolean) => {
  let text = ""

  if (followUp) {
    text += data
      .previous!.filter((v: number | null) => v != null)
      .join(MULTIPLICATOR)
      .padEnd(colSizes.previous)
  }

  text && (text += DELIMITER)
  text += data.current
    .filter((v: number | null) => v != null)
    .join(MULTIPLICATOR)
    .padEnd(colSizes.current)

  return text
}

const createDescriptionCellRow = (rowData: MeasurementsRow, colSizes: ColSizes) => {
  let text = ""

  text += rowData.location.padEnd(colSizes.location)

  text && (text += DELIMITER)
  text += rowData.reference.padEnd(colSizes.reference)

  return text
}

const createTableRow = (data: MeasurementsRow, colSizes: ColSizes, followUp: boolean) => {
  let text: string = ""
  text += createMeasureCellRow(data, colSizes, followUp)
  text && (text += DELIMITER)
  text += createDescriptionCellRow(data, colSizes)
  return text
}

const createTableBody = (data: MeasurementsData, colSizes: ColSizes, followUp: boolean) => {
  const rows: string[] = []
  data.forEach((rowData) => {
    if (!checkDataRowEmpty(rowData)) {
      rows.push(createTableRow(rowData, colSizes, followUp))
    }
  })
  return rows.join(NEWLINE_CHAR)
}

const createTableFooter = (stats: string) => stats

interface MeasurementsTableTextProps {
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

export const MeasurementsOutputText = ({
  data,
  stats,
  label,
  labels,
}: MeasurementsTableTextProps) => {
  const colSizes = calcColSizes(
    data,
    labels.previous,
    labels.current,
    labels.location,
    labels.reference
  )

  const { followUp } = getMeasurementsDataParams(data)

  return (
    <>
      {label}
      {NEWLINE_CHAR}
      {createTableHeader(
        colSizes,
        followUp,
        labels.previous,
        labels.current,
        labels.location,
        labels.reference
      )}
      {NEWLINE_CHAR}
      {createTableBody(data, colSizes, followUp)}
      {NEWLINE_CHAR}
      {createTableFooter(stats)}
      {NEWLINE_CHAR}
    </>
  )
}
