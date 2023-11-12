import { describe, expect, it } from "vitest"
import {
  defineLungRads2022,
  Category,
  calcAverageDiameter,
  LungRads2022Input,
} from "./lungRads2022Utils"

const emptyInput: LungRads2022Input = {
  problematicExam: null,
  timepoint: null,
  previous: null,
  nodule: false,
  benignFeatures: null,
  structure: null,
  featuresSolid: null,
  longaxis: null,
  shortaxis: null,
  longaxisSolid: null,
  shortaxisSolid: null,
  dynamic: null,
  timeOfDynamicNodule: null,
  cyst: false,
  wall: null,
  formation: null,
  dynamicUnilocular: null,
  dynamicMultilocular: null,
  timeOfDynamicCyst: null,
  suspicious: [],
}

describe("Calculate average diameter", () => {
  it.each([
    [2, 1, 1.5],
    [6, 5, 5.5],
    [11, 1, 6],
    [12, 10, 11],
  ])("should be calculated correctly", (longaxis, shortaxis, result) => {
    expect(calcAverageDiameter(longaxis, shortaxis)).toBe(result)
  })
})

describe("Category 0", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [{ problematicExam: "prior-CT-not-available" }],
    [{ problematicExam: "not-evaluable" }],
    [{ problematicExam: "infectious" }],
  ])("should give correct result for problematic exam", (input) => {
    const finalInput = { ...emptyInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category0)
  })
})

describe("Category 1", () => {
  it("should give correct result for no lung nodules", () => {
    const finalInput: LungRads2022Input = {
      ...emptyInput,
      problematicExam: "none",
    }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category1)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ nodule: true, benignFeatures: "calcification" }],
    [{ nodule: true, benignFeatures: "fat" }],
  ])("should give correct result for nodule with benign features", (input) => {
    const finalInput = { ...emptyInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category1)
  })
})
