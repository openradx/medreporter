import produce from "immer"
import {
  MeasurementsAction,
  MeasurementsData,
  MeasurementsDataParams,
  MeasurementsRow,
  MeasurementsStats,
  MeasureValues,
} from "../components/inputs/MeasurementsInput/measurementTypes"

export const getMeasurementsDataParams = (data: MeasurementsData): MeasurementsDataParams => {
  const rows = data.length
  const dimensions = data[0].current.length
  const followUp = data[0].previous !== undefined

  return {
    rows,
    dimensions,
    followUp,
  }
}

const createEmptyMeasureValues = (dimensions: 1 | 2 | 3): MeasureValues => {
  switch (dimensions) {
    case 1:
      return [null]
    case 2:
      return [null, null]
    case 3:
      return [null, null, null]
    default: {
      throw new Error(`Invalid dimensions: ${dimensions}`)
    }
  }
}

const createEmptyMeasurementsRow = (followUp: boolean, dimensions: 1 | 2 | 3): MeasurementsRow => {
  const rowData: MeasurementsRow = {
    current: createEmptyMeasureValues(dimensions),
    location: "",
    reference: "",
  }
  if (followUp) {
    rowData.previous = createEmptyMeasureValues(dimensions)
  }
  return rowData
}

export const createEmptyMeasurements = (
  followUp: boolean,
  rows: number,
  dimensions: 1 | 2 | 3
): MeasurementsData => {
  const data: MeasurementsData = []
  for (let row = 0; row < rows; row++) {
    const rowData = createEmptyMeasurementsRow(followUp, dimensions)
    data.push(rowData)
  }
  return data
}

export const checkDataRowEmpty = (dataRow: MeasurementsRow) => {
  for (const measureType of ["previous", "current"] as const) {
    const values = dataRow[measureType]
    if (values === undefined) {
      continue
    }
    for (let dim = 0; dim < values.length; dim++) {
      const value = values[dim]
      if (value !== null) {
        return false
      }
    }
  }
  for (const textColumn of ["reference", "location"] as const) {
    const text = dataRow[textColumn]
    if (text.trim()) {
      return false
    }
  }
  return true
}

export const calcStats = (data: MeasurementsData): MeasurementsStats => {
  const valid = {
    previous: true,
    current: true,
  }

  const totalSums: { previous: number | null; current: number | null } = {
    previous: null,
    current: null,
  }

  for (let row = 0; row < data.length; row++) {
    if (checkDataRowEmpty(data[row])) {
      continue
    }

    for (const measureType of ["previous", "current"] as const) {
      const values = data[row][measureType]
      if (values === undefined) {
        continue
      }

      let product: number | null = null
      for (let dim = 0; dim < values.length; dim++) {
        const value = values[dim]
        if (value !== null) {
          if (product === null) {
            product = value
          } else {
            product *= value
          }
        }
      }
      if (product === null) {
        valid[measureType] = false
      } else {
        const sum = totalSums[measureType]
        if (sum === null) {
          totalSums[measureType] = product
        } else {
          totalSums[measureType] = sum + product
        }
      }
    }
  }

  const previousSum = totalSums.previous
  const currentSum = totalSums.current
  let percentageChange: number | null = null
  if (previousSum !== null && currentSum !== null) {
    const increase = currentSum - previousSum
    percentageChange = (increase / previousSum) * 100
  }

  return {
    previousSum,
    currentSum,
    percentageChange,
  }
}

export const createStatsText = (stats: MeasurementsStats): string => {
  const { previousSum, currentSum, percentageChange } = stats

  let txt = `${String.fromCharCode(0x2211)} ` // sum symbol
  if (previousSum !== null && currentSum !== null) {
    let arrow = String.fromCharCode(0x02192) // right arrow
    if (percentageChange! < -10) {
      arrow = String.fromCharCode(0x02198) // south east arrow
    } else if (percentageChange! > +10) {
      arrow = String.fromCharCode(0x02197) // north east arrow
    }
    txt += `${previousSum} mm ${arrow} ${currentSum} mm`

    let sign = ""
    if (percentageChange! > 0) {
      sign = "+" // "-" is automatically added
    }
    txt += ` (${sign}${Math.round(percentageChange!)}%)`
    return txt
  }

  if (currentSum !== null) {
    txt += `${currentSum} mm`
    return txt
  }

  return ""
}

export const measurementsReducer = (
  data: MeasurementsData,
  action: MeasurementsAction
): MeasurementsData => {
  switch (action.type) {
    case "changeNumberValue": {
      const { row, measureType, dimension, value } = action
      return produce(data, (draft) => {
        const values = draft[row][measureType]
        if (values !== undefined) {
          values[dimension] = value
        }
      })
    }
    case "changeTextValue": {
      const { rowNumber, textType, value } = action
      return produce(data, (draft) => {
        draft[rowNumber][textType] = value
      })
    }
    case "changeFollowUp": {
      const { hasPrevious } = action
      const dimensions = data[0].current.length
      return produce(data, (draft) => {
        draft.forEach((rowData) => {
          if (hasPrevious) {
            rowData.previous = createEmptyMeasureValues(dimensions)
          } else {
            delete rowData.previous
          }
        })
      })
    }
    case "changeRows": {
      const { rows } = action
      const followUp = "previous" in data[0]
      const dimensions = data[0].current.length
      return produce(data, (draft) => {
        const diff = rows - data.length
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            const rowData = createEmptyMeasurementsRow(followUp, dimensions)
            draft.push(rowData)
          }
        } else {
          draft.length = rows
        }
      })
    }
    case "changeDimensions": {
      const { dimensions } = action
      const followUp = "previous" in data[0]
      const measureTypes = followUp ? (["previous", "current"] as const) : (["current"] as const)
      return produce(data, (draft) => {
        draft.forEach((rowData) => {
          for (const measureType of measureTypes) {
            const values = rowData[measureType]
            if (values !== undefined) {
              const diff = dimensions - values.length
              if (diff > 0) {
                rowData[measureType] = [
                  ...values,
                  ...createEmptyMeasureValues(diff as 1 | 2),
                ] as any
              } else if (diff < 0) {
                rowData[measureType]!.length = dimensions
              }
            }
          }
        })
      })
    }
    case "clearAll": {
      const followUp = "previous" in data[0]
      const rows = data.length
      const dimensions = data[0].current.length
      return createEmptyMeasurements(followUp, rows, dimensions)
    }
    case "shiftCurrent": {
      return produce(data, (draft) => {
        draft.forEach((rowData) => {
          rowData.previous = [...rowData.current]
          rowData.current.fill(null)
          rowData.reference = ""
        })
      })
    }
    default: {
      throw new Error(`Invalid measurements action: ${action}`)
    }
  }
}
