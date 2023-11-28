import { describe, expect, it } from "vitest"
import {
  defineLungRads2022,
  Category,
  calcAverageDiameter,
  LungRads2022Input,
  giveLungRads2022Recommendation,
  LungRads2022RecommendationInput,
  LungRads2022Recommendation,
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
  problematicExam: "none",
  previous: "3",
  timepoint: "follow-up",
}

const previous4AInput: LungRads2022Input = {
  ...emptyInput,
  problematicExam: "none",
  previous: "4A",
  timepoint: "follow-up",
}

const cystInput: LungRads2022Input = {
  ...emptyInput,
  timepoint: "baseline",
  cyst: true,
}

const slowlyGrowingInput: LungRads2022Input = {
  ...emptyInput,
  problematicExam: "none",
  timepoint: "follow-up",
  nodule: true,
  benignFeatures: "none",
  dynamic: "slowlyGrowing",
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

/** Category 4A */
describe("Category 4A", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", featuresSolid: "none", longaxis: 10, shortaxis: 9 }],
    [
      {
        timepoint: "follow-up",
        featuresSolid: "none",
        longaxis: 8,
        shortaxis: 7,
        dynamic: "growing",
      },
    ],
    [{ timepoint: "follow-up", featuresSolid: "none", longaxis: 8, shortaxis: 7, dynamic: "new" }],
  ])("should give correct result for large solid nodules", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4A)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", longaxis: 8, shortaxis: 7, longaxisSolid: 7, shortaxisSolid: 6 }],
    [
      {
        timepoint: "follow-up",
        longaxis: 8,
        shortaxis: 7,
        longaxisSolid: 4,
        shortaxisSolid: 3,
        dynamic: "growing",
      },
    ],
    [
      {
        timepoint: "follow-up",
        longaxis: 8,
        shortaxis: 7,
        longaxisSolid: 4,
        shortaxisSolid: 3,
        dynamic: "new",
      },
    ],
  ])("should give correct result for large part solid nodules", (input) => {
    const finalInput = { ...partSolidNoduleInpput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4A)
  })

  it("should give correct result for segmental or more proximal airway nodules", () => {
    const finalInput: LungRads2022Input = {
      ...solidNoduleInput,
      timepoint: "baseline",
      featuresSolid: "segmental-airway",
    }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4A)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", wall: "thick", formation: "unilocular" }],
    [{ timepoint: "baseline", wall: "thick", formation: "multilocular" }],
    [{ timepoint: "baseline", wall: "thin", formation: "multilocular" }],
    [
      {
        timepoint: "follow-up",
        wall: "thick",
        formation: "multilocular",
        dynamicMultilocular: "newly-multilocular",
      },
    ],
    [
      {
        timepoint: "follow-up",
        wall: "thin",
        formation: "multilocular",
        dynamicMultilocular: "newly-multilocular",
      },
    ],
  ])("should give correct result for complex cyst", (input) => {
    const finalInput = { ...cystInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4A)
  })
})

/** Category 4B */
describe("Category 4B", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "follow-up", featuresSolid: "segmental-airway", dynamic: "growing" }],
    [{ timepoint: "follow-up", featuresSolid: "segmental-airway", dynamic: "stable" }],
  ])("should give correct result for persistent segmental airway nodule", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4B)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", featuresSolid: "none", longaxis: 16, shortaxis: 15 }],
    [{ timepoint: "follow-up", featuresSolid: "none", longaxis: 9, shortaxis: 8, dynamic: "new" }],
    [
      {
        timepoint: "follow-up",
        featuresSolid: "none",
        longaxis: 9,
        shortaxis: 8,
        dynamic: "growing",
      },
    ],
  ])("should give correct result for really large solid nodules", (input) => {
    const finalInput = { ...solidNoduleInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4B)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [{ timepoint: "baseline", longaxis: 10, shortaxis: 9, longaxisSolid: 9, shortaxisSolid: 8 }],
    [
      {
        timepoint: "follow-up",
        longaxis: 8,
        shortaxis: 7,
        longaxisSolid: 6,
        shortaxisSolid: 5,
        dynamic: "growing",
      },
    ],
    [
      {
        timepoint: "follow-up",
        longaxis: 8,
        shortaxis: 7,
        longaxisSolid: 6,
        shortaxisSolid: 5,
        dynamic: "new",
      },
    ],
  ])("should give correct result for really large part solid nodules", (input) => {
    const finalInput = { ...partSolidNoduleInpput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4B)
  })

  it.each<[Partial<LungRads2022Input>]>([
    [
      {
        timepoint: "follow-up",
        wall: "thick",
        formation: "multilocular",
        dynamicMultilocular: "increased-solid",
      },
    ],
    [
      {
        timepoint: "follow-up",
        wall: "thick",
        formation: "unilocular",
        dynamicUnilocular: "wall-growing",
      },
    ],
    [
      {
        timepoint: "follow-up",
        wall: "thick",
        formation: "multilocular",
        dynamicMultilocular: "cyst-growing",
      },
    ],
    [
      {
        timepoint: "follow-up",
        wall: "thin",
        formation: "multilocular",
        dynamicMultilocular: "cyst-growing",
      },
    ],
  ])("should give correct result for growing complex cysts", (input) => {
    const finalInput = { ...cystInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4B)
  })

  it.each<[Partial<LungRads2022Input>]>([[{ structure: "solid" }], [{ structure: "partsolid" }]])(
    "should give corect result for slowly growing nodules",
    (input) => {
      const finalInput = { ...slowlyGrowingInput, ...input }
      const category = defineLungRads2022(finalInput)
      expect(category).toBe(Category.Category4B)
    }
  )
})

describe("Category 4X", () => {
  it.each<[Partial<LungRads2022Input>]>([
    [
      {
        problematicExam: "none",
        timepoint: "baseline",
        nodule: true,
        benignFeatures: "none",
        structure: "solid",
        featuresSolid: "none",
        longaxis: 30,
        shortaxis: 25,
        suspicious: ["lymphadenopathy"],
      },
    ],
    [
      {
        problematicExam: "none",
        timepoint: "baseline",
        nodule: true,
        benignFeatures: "none",
        structure: "groundglass",
        longaxis: 35,
        shortaxis: 30,
        suspicious: ["lymphadenopathy"],
      },
    ],
  ])("should give corect result for suspicious findings", (input) => {
    const finalInput = { ...emptyInput, ...input }
    const category = defineLungRads2022(finalInput)
    expect(category).toBe(Category.Category4X)
  })
})

/** Recommendation */
const emptyRecommendationInput: LungRads2022RecommendationInput = {
  category: Category.NoCategory,
  problematicExam: null,
  structure: null,
  featuresSolid: null,
}

describe("giveLungRads2022Recommendation", () => {
  it("should give corect result for no recommendation possible", () => {
    const recommendation = giveLungRads2022Recommendation({ ...emptyRecommendationInput })
    expect(recommendation).toBe(LungRads2022Recommendation.NoRecommendationPossible)
  })

  it("should give corect result for necessary comparison", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category0,
      problematicExam: "prior-CT-not-available",
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Comparison)
  })

  it("should give corect result for necessary additional", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category0,
      problematicExam: "not-evaluable",
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Additional)
  })

  it("should give corect result for infectious exams", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category0,
      problematicExam: "infectious",
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Ct1To3Months)
  })

  it("should give corect result for category 1", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category1,
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Ct12Months)
  })

  it("should give corect result for category 2", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category2,
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Ct12Months)
  })

  it("should give corect result for category 3", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category3,
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Ct6Months)
  })

  it("should give corect result for category 4A", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category4A,
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.Ct3MonthsOrPet)
  })

  it("should give corect result for category 4B with airway nodule", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category4B,
      structure: "solid",
      featuresSolid: "segmental-airway",
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.ClinicalEvaluation)
  })

  it("should give corect result for category 4B without airway nodule", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category4B,
      structure: "solid",
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.TissueSamplingPetFollowUp)
  })

  it("should give correct result for Category 4X", () => {
    const finalInput: LungRads2022RecommendationInput = {
      ...emptyRecommendationInput,
      category: Category.Category4X,
    }
    const recommendation = giveLungRads2022Recommendation(finalInput)
    expect(recommendation).toBe(LungRads2022Recommendation.TissueSamplingPetFollowUp)
  })
})
