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

export type MeasurementsData = MeasurementsRow[]

export type MeasurementsDataParams = {
  rows: number
  dimensions: 1 | 2 | 3
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
      dimension: 0 | 1 | 2
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
  | { type: "changeDimensions"; dimensions: 1 | 2 | 3 }
  | { type: "clearAll" }
  | { type: "clearReferences" }
  | { type: "shiftCurrent" }
