import { ElementNode } from "@medreporter/medtl-parser"
import {
  ContextData,
  createContext,
  ElementWrapper,
  evaluateExpression,
  ExpressionValue,
  MedtlRecord,
} from "@medreporter/medtl-tools"
import { MeasurementsData, MeasureValues } from "~/types/measurements"

export function extractText(element: ElementNode, data: ContextData, lng: string): string {
  const wrapper = new ElementWrapper(element)
  const attrLng = wrapper.getAttribute("lng" as string)?.getStringValue(createContext(data, lng))
  if (attrLng !== undefined && attrLng !== lng) {
    return ""
  }

  let text = ""
  for (const child of element.children) {
    if (child.type === "Chardata") {
      text += child.value
    } else if (child.type === "ExpressionContainer" && child.expression) {
      text += String(evaluateExpression(child.expression, createContext(data, lng)))
    } else if (child.type === "Element") {
      text += extractText(child, data, lng)
    }
  }
  return text
}

export function convertDateToRecord(date: Date): MedtlRecord {
  const record = new MedtlRecord()
  const year = date.getFullYear()
  record.put("year", year)
  const month = date.getMonth() + 1
  record.put("month", month)
  const day = date.getDate()
  record.put("day", day)
  return record
}

export function convertTimeToRecord(time: Date): MedtlRecord {
  const record = new MedtlRecord()
  const hours = time.getHours()
  record.put("hours", hours)
  const minutes = time.getMinutes()
  record.put("minutes", minutes)
  const seconds = time.getSeconds()
  record.put("seconds", seconds)
  return record
}

function convertRecordToMeasureValues(value?: ExpressionValue): MeasureValues {
  if (!(value instanceof MedtlRecord)) return [null, null, null]

  let x: number | null = value.get(0) === undefined ? null : Number(value.get(0))
  x = Number.isSafeInteger(x) ? x : null

  let y: number | undefined | null = value.get(1) === undefined ? undefined : Number(value.get(1))
  y = y === undefined || Number.isSafeInteger(y) ? y : null

  if (y === undefined) return [x]

  let z: number | undefined | null = value.get(2) === undefined ? undefined : Number(value.get(2))
  z = z === undefined || Number.isSafeInteger(z) ? z : null

  if (z === undefined) return [x, y]

  return [x, y, z]
}

const DEFAULT_MEASUREMENTS_DATA: MeasurementsData = []

export function convertRecordToMeasurementsData(value: ExpressionValue): MeasurementsData {
  if (!(value instanceof MedtlRecord)) return DEFAULT_MEASUREMENTS_DATA

  const measurements: MeasurementsData = []
  for (const row of value.values()) {
    if (!(row instanceof MedtlRecord)) continue

    if (row.size <= 3) {
      const current = convertRecordToMeasureValues(row.get(0))
      const location = String(row.get(1) ?? "")
      const reference = String(row.get(2) ?? "")
      measurements.push({ current, location, reference })
    } else {
      const previous = convertRecordToMeasureValues(row.get(0))
      const current = convertRecordToMeasureValues(row.get(1))
      const location = String(row.get(2) ?? "")
      const reference = String(row.get(3) ?? "")
      measurements.push({ previous, current, location, reference })
    }
  }

  return measurements
}

function convertMeasureValuesToRecord(value: MeasureValues): MedtlRecord {
  const record = new MedtlRecord([[null, value[0]]]) // x
  if (value[1] !== undefined) record.put(value[1]) // y
  if (value[2] !== undefined) record.put(value[2]) // z
  return record
}

export function convertMeasurementsDataToRecord(value: MeasurementsData): MedtlRecord {
  const dataRecord = new MedtlRecord()
  for (const row of value) {
    const rowRecord = new MedtlRecord()
    if (row.previous) {
      const previous = convertMeasureValuesToRecord(row.previous)
      rowRecord.put("previous", previous)
    }
    const current = convertMeasureValuesToRecord(row.current)
    rowRecord.put("current", current)
    const { location, reference } = row
    rowRecord.put("location", location)
    rowRecord.put("reference", reference)
    dataRecord.put(rowRecord)
  }
  return dataRecord
}
