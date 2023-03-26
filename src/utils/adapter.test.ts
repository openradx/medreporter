import { MedtlRecord } from "@medreporter/medtl-tools"
import { MdRowing } from "react-icons/md"
import { describe, expect, it } from "vitest"
import { MeasurementsData } from "~/types/measurements"
import {
  convertDateToRecord,
  convertMeasurementsDataToRecord,
  convertRecordToMeasurementsData,
  convertTimeToRecord,
} from "./adapter"

describe("convertDateToRecord", () => {
  it("can convert a date to a record", () => {
    const record = convertDateToRecord(new Date(2022, 9, 7))
    expect(record.size).toBe(3)
    const fields = record.fields()
    expect(fields[0]).toEqual([2022, 0, "year"])
    expect(fields[1]).toEqual([10, 1, "month"])
    expect(fields[2]).toEqual([7, 2, "day"])
  })
})

describe("convertTimeToRecord", () => {
  it("can convert a date to a record", () => {
    const record = convertTimeToRecord(new Date(0, 0, 1, 11, 12, 13))
    expect(record.size).toBe(3)
    const fields = record.fields()
    expect(fields[0]).toEqual([11, 0, "hours"])
    expect(fields[1]).toEqual([12, 1, "minutes"])
    expect(fields[2]).toEqual([13, 2, "seconds"])
  })
})

describe("convertRecordToMeasurementsData", () => {
  it("can convert a record to measurements data", () => {
    const record = MedtlRecord.from([[[1, 2], [3, 4], "loc1", "ref1"]])
    const data = convertRecordToMeasurementsData(record)
    expect(data[0].previous).toEqual([1, 2])
    expect(data[0].current).toEqual([3, 4])
    expect(data[0].location).toBe("loc1")
    expect(data[0].reference).toBe("ref1")
  })
})

describe("convertMeasurementsDataToRecord", () => {
  it("can convert measurements data to a record", () => {
    const data: MeasurementsData = [
      { previous: [1, 2], current: [3, 4], location: "loc1", reference: "ref1" },
    ]
    const record = convertMeasurementsDataToRecord(data)
    const row = record.get(0) as MedtlRecord
    expect((row.get("previous") as MedtlRecord).get(0)).toEqual(1)
    expect((row.get("current") as MedtlRecord).get(1)).toEqual(4)
    expect(row.get("location")).toEqual("loc1")
    expect(row.get("reference")).toEqual("ref1")
  })
})
