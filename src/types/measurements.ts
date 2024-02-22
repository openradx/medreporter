export type Dimensions = 1 | 2 | 3

export type Dimension = Dimensions

export type MeasurementsDataParams = {
  rows: number
  dimensions: Dimensions
  followUp: boolean
}

export type MeasurementsStats = {
  previousSum: number | null
  currentSum: number | null
  percentageChange: number | null
}

export type MeasurementsAction =
  | {
      type: "changeNumberValue"
      row: number
      measureType: "previous" | "current"
      dimension: Dimension
      value: number | null
    }
  | {
      type: "changeTextValue"
      rowNumber: number
      textType: "location" | "reference"
      value: string
    }
  | { type: "changeFollowUp"; hasPrevious: boolean }
  | {
      type: "changeRows"
      rows: number
    }
  | { type: "changeDimensions"; dimensions: Dimensions }
  | { type: "clearAll" }
  | { type: "clearReferences" }
  | { type: "shiftCurrent" }
