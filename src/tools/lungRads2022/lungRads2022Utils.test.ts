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

const solidNoduleInput: LungRads2022Input = {
  ...emptyInput,
  problematicExam: "none",
  benignFeatures: "none",
  nodule: true,
  structure: "solid",
}

const partSolidNoduleInpput: LungRads2022Input = {
  ...emptyInput,
  problematicExam: "none",
  benignFeatures: "none",
  nodule: true,
  structure: "partsolid",
}

const groundGlassNoduleInput: LungRads2022Input = {
  ...emptyInput,
  problematicExam: "none",
  benignFeatures: "none",
  nodule: true,
  structure: "groundglass",
}

const previous3Input: LungRads2022Input = {
  ...emptyInput,
  previous: "3",
  timepoint: "follow-up",
}

const previous4AInput: LungRads2022Input = {
  ...emptyInput,
  previous: "4A",
  timepoint: "follow-up",
}

const cystInput: LungRads2022Input = {
  ...emptyInput,
  timepoint: "baseline",
  cyst: true,
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

/** Category 0 */
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

/** Category 1 */
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

/** Category 2 */
describe("Category 2", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [{ featuresSolid: "smooth-margins", longaxis: 10, shortaxis: 9 }],
    [{ timepoint: "baseline", featuresSolid: "smooth-margins", longaxis: 10, shortaxis: 9 }],
    [
      {
        timepoint: "follow-up",
        featuresSolid: "smooth-margins",
        longaxis: 10,
        shortaxis: 9,
        dynamic: "new",
      },
    ],
  ])("should give correct result for juxtapleural nodule", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", featuresSolid: "none", longaxis: 6, shortaxis: 5 }],
    [{ timepoint: "follow-up", featuresSolid: "none", longaxis: 4, shortaxis: 3, dynamic: "new" }],
  ])("should give correct result for small solid nodules", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })

  it("should give correct result for small part solid nodules", () => {
    const finalInput: LungRads2022Input = {
      ...partSolidNoduleInpput,
      timepoint: "baseline",
      longaxis: 6,
      shortaxis: 5,
    }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", longaxis: 30, shortaxis: 29 }],
    [{ timepoint: "follow-up", longaxis: 30, shortaxis: 29, dynamic: "new" }],
    [{ timepoint: "follow-up", longaxis: 30, shortaxis: 29, dynamic: "growing" }],
    [{ timepoint: "follow-up", longaxis: 30, shortaxis: 30, dynamic: "slowlyGrowing" }],
    [{ timepoint: "follow-up", longaxis: 30, shortaxis: 30, dynamic: "stable" }],
  ])("should give correct result for GGN nodules", (input) => {
    const finalInput = { ...groundGlassNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", featuresSolid: "subsegmental-airway" }],
    [{ timepoint: "follow-up", featuresSolid: "subsegmental-airway", dynamic: "new" }],
    [{ timepoint: "follow-up", featuresSolid: "subsegmental-airway", dynamic: "stable" }],
  ])("should give correct result for subsegmental airway nodule", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ nodule: true, dynamic: "stable", timeOfDynamicNodule: 7 }],
    [{ cyst: true, dynamicMultilocular: "stable", timeOfDynamicCyst: 7 }],
    [{ cyst: true, dynamicUnilocular: "stable", timeOfDynamicCyst: 7 }],
  ])("should give correct result for stable lesion", (input) => {
    const finalInput = { ...previous3Input, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category2)
  })
})

/** Category 3 */
describe("Category 3", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", featuresSolid: "none", longaxis: 6, shortaxis: 6 }],
    [{ timepoint: "baseline", featuresSolid: "none", longaxis: 9, shortaxis: 6 }],
    [{ timepoint: "follow-up", featuresSolid: "none", longaxis: 4, shortaxis: 4, dynamic: "new" }],
    [{ timepoint: "follow-up", featuresSolid: "none", longaxis: 7, shortaxis: 4, dynamic: "new" }],
  ])("should give correct result for medium solid nodules", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category3)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", longaxis: 6, shortaxis: 6, longaxisSolid: 6, shortaxisSolid: 5 }],
    [{ timepoint: "baseline", longaxis: 9, shortaxis: 6, longaxisSolid: 7, shortaxisSolid: 4 }],
    [{ timepoint: "follow-up", longaxis: 7, shortaxis: 4, dynamic: "new" }],
  ])("should give correct result for medium part solid nodules", (input) => {
    const finalInput = { ...partSolidNoduleInpput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category3)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", longaxis: 30, shortaxis: 31 }],
    [{ timepoint: "follow-up", longaxis: 30, shortaxis: 31, dynamic: "new" }],
  ])("should give correct result for large ground glass nodules", (input) => {
    const finalInput = { ...groundGlassNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category3)
  })

  it("should give correct result for growing cystic component", () => {
    const finalInput: LungRads2022Input = {
      ...cystInput,
      timepoint: "follow-up",
      wall: "thick",
      formation: "unilocular",
      dynamicUnilocular: "cyst-growing",
    }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category3)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ nodule: true, dynamic: "stable", timeOfDynamicNodule: 4 }],
    [{ cyst: true, dynamicMultilocular: "stable", timeOfDynamicCyst: 4 }],
    [{ cyst: true, dynamicUnilocular: "stable", timeOfDynamicCyst: 4 }],
  ])("should give correct result for stable lesion", (input) => {
    const finalInput = { ...previous4AInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category3)
  })
})
