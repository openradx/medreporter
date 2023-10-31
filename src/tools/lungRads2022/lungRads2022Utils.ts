export function calcAverageDiameter(
  longaxis: number | null,
  shortaxis: number | null
): number | null {
  let average = null
  if (longaxis && shortaxis) {
    average = (longaxis + shortaxis) / 2
  }
  return average
}

export enum Category {
  NoCategory = "LungRads2022.noCategory",
  Category0 = "LungRads2022.category0",
  Category1 = "LungRads2022.category1",
  Category2 = "LungRads2022.category2",
  Category3 = "LungRads2022.category3",
  Category4A = "LungRads2022.category4A",
  Category4B = "LungRads2022.category4B",
  Category4X = "LungRads2022.category4X",
  thinWalledUnilocular = "LungRads2022.thinWalledUnilocular",
}

export type LungRads2022Result = {
  category: Category
}

export const defineLungRads2022 = (
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none",
  timepoint: "baseline" | "follow-up",
  previous: "0" | "1" | "2" | "3" | "4A" | "4B" | "4X",
  nodule: boolean,
  benignFeatures: "calcification" | "fat" | "none",
  structure: "solid" | "groundglass" | "partsolid",
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none",
  longaxis: number | null,
  shortaxis: number | null,
  longaxisSolid: number | null,
  shortaxisSolid: number | null,
  dynamic: "new" | "stable" | "slowly-growing" | "growing" | "decreasing",
  timeOfDynamicNodule: number,
  cyst: boolean,
  wall: "thin" | "thick",
  formation: "unilocular" | "multilocular",
  dynamicUnilocular: "stable" | "cyst-growing" | "wall-growing",
  dynamicMultilocular: "stable" | "cyst-growing" | "newly-multilocular" | "increased-solid",
  timeOfDynamicCyst: number,
  suspicious: ("spiculation" | "lymphadenopathy" | "metastasis" | "GGN-doubled" | "other")[]
): LungRads2022Result => {
  const averageDiameter: number | null = calcAverageDiameter(longaxis, shortaxis)
  const averageDiameterSolid: number | null = calcAverageDiameter(longaxisSolid, shortaxisSolid)
  let category: Category = Category.NoCategory

  if (problematicExam && problematicExam !== "none") {
    category = Category.Category0
  } else if (!nodule && !cyst && problematicExam === "none") {
    category = Category.Category1
  } else if (nodule) {
    if (benignFeatures === "calcification" || benignFeatures === "fat") {
      category = Category.Category1
    } else if (
      featuresSolid === "smooth-margins" &&
      averageDiameter !== null &&
      averageDiameter < 10
    ) {
      category = Category.Category2
    } else if (
      featuresSolid === "subsegmental-airway" &&
      (timepoint === "baseline" || dynamic === "new" || dynamic === "stable")
    ) {
      category = Category.Category2
    } else if (featuresSolid === "segmental-airway") {
      if (timepoint === "baseline") {
        category = Category.Category4A
      } else if (dynamic === "stable" || dynamic === "growing") {
        category = Category.Category4B
      }
    } else if (structure === "solid") {
      if (timepoint === "baseline") {
        if (averageDiameter !== null && averageDiameter < 6) {
          category = Category.Category2
        } else if (averageDiameter !== null && averageDiameter >= 6 && averageDiameter < 8) {
          category = Category.Category3
        } else if (averageDiameter !== null && averageDiameter >= 8 && averageDiameter < 15) {
          category = Category.Category4A
        } else if (averageDiameter !== null && averageDiameter >= 15) {
          category = Category.Category4B
        }
      } else if (timepoint === "follow-up") {
        if (dynamic === "growing") {
          if (averageDiameter !== null && averageDiameter < 8) {
            category = Category.Category4A
          } else if (averageDiameter !== null && averageDiameter >= 8) {
            category = Category.Category4B
          }
        } else if (dynamic === "new") {
          if (averageDiameter !== null && averageDiameter < 4) {
            category = Category.Category2
          } else if (averageDiameter !== null && averageDiameter >= 4 && averageDiameter < 6) {
            category = Category.Category3
          } else if (averageDiameter !== null && averageDiameter >= 6 && averageDiameter < 8) {
            category = Category.Category4A
          } else if (averageDiameter !== null && averageDiameter >= 8) {
            category = Category.Category4B
          }
        } else if (dynamic === "slowly-growing") {
          Category.Category4B
        }
      }
    } else if (structure === "partsolid") {
      if (timepoint === "baseline") {
        if (averageDiameter !== null && averageDiameter < 6) {
          category = Category.Category2
        } else if (averageDiameter !== null && averageDiameter >= 6) {
          if (averageDiameterSolid && averageDiameterSolid < 6) {
            category = Category.Category3
          } else if (
            averageDiameterSolid !== null &&
            averageDiameterSolid >= 6 &&
            averageDiameterSolid < 8
          ) {
            category = Category.Category4A
          } else if (averageDiameterSolid !== null && averageDiameterSolid >= 8) {
            category = Category.Category4B
          }
        }
      } else if (timepoint === "follow-up") {
        if (dynamic === "new" || dynamic === "growing") {
          if (averageDiameter !== null && averageDiameter < 6) {
            category = Category.Category3
          } else if (averageDiameter !== null && averageDiameter >= 6) {
            if (averageDiameterSolid !== null && averageDiameterSolid < 4) {
              category = Category.Category4A
            } else if (averageDiameterSolid !== null && averageDiameterSolid >= 4) {
              category = Category.Category4B
            }
          }
        }
      }
    } else if (structure === "groundglass") {
      if (
        averageDiameter !== null &&
        (averageDiameter < 30 ||
          (averageDiameter >= 30 &&
            timepoint === "follow-up" &&
            (dynamic === "slowly-growing" || dynamic === "stable")))
      ) {
        category = Category.Category2
      } else if (
        averageDiameter !== null &&
        averageDiameter >= 30 &&
        (timepoint === "baseline" ||
          (timepoint === "follow-up" && (dynamic === "growing" || dynamic === "new"))) //growing GGN is not in classification
      ) {
        category = Category.Category3
      }
    }
  } else if (cyst) {
    if (formation === "unilocular") {
      if (wall === "thin") {
        category = Category.thinWalledUnilocular
      } else if (wall === "thick") {
        if (timepoint === "baseline") {
          category = Category.Category4A
        } else if (timepoint === "follow-up" && dynamicUnilocular === "wall-growing") {
          category = Category.Category4B
        }
      }
    } else if (formation === "multilocular") {
      if (timepoint === "baseline") {
        category = Category.Category4A
      } else if (timepoint === "follow-up") {
        if (
          dynamicMultilocular === "increased-solid" ||
          dynamicMultilocular === "newly-multilocular" ||
          dynamicMultilocular === "cyst-growing"
        ) {
          category = Category.Category4B
        }
      }
    }
  }

  if (
    previous === "3" &&
    timepoint === "follow-up" &&
    (dynamic === "stable" || dynamicUnilocular === "stable" || dynamicMultilocular === "stable")
  ) {
    if (timeOfDynamicNodule >= 3 || timeOfDynamicCyst >= 3) {
      category = Category.Category2
    } else {
      category = Category.Category3
    }
  } else if (
    previous === "4A" &&
    timepoint === "follow-up" &&
    featuresSolid !== "segmental-airway" &&
    featuresSolid !== "subsegmental-airway" &&
    structure !== "groundglass" &&
    (dynamic === "stable" || dynamicUnilocular === "stable" || dynamicMultilocular === "stable")
  ) {
    if (timeOfDynamicNodule >= 6 || timeOfDynamicCyst >= 6) {
      category = Category.Category3
    } else {
      category = Category.Category4A
    }
  }

  if (
    (category === Category.Category3 ||
      category === Category.Category4A ||
      category === Category.Category4B) &&
    suspicious &&
    suspicious.length > 0
  ) {
    category = Category.Category4X
  }
  return { category }
}

export enum Recommendation {
  NoRecommendationPossible = "LungRads2022.NoRecommendationPossible",
  Comparison = "LungRads2022.Comparison",
  Additional = "LungRads2022.Additional",
  Ct1To3Months = "LungRads2022.Ct1To3Months",
  Ct12Months = "LungRads2022.Ct12Months",
  Ct6Months = "LungRads2022.Ct6Months",
  Ct3MonthsOrPet = "LungRads2022.Ct3MonthsOrPet",
  ClinicalEvaluation = "LungRads2022.ClinicalEvaluation",
  TissueSamplingPetFollowUp = "LungRads2022.TissueSamplingPetFollowUp",
  SpecificFinding = "LungRads2022.SpecificFinding",
}

export type LungRads2022Recommendation = { recommendation: Recommendation }

export const giveLungRads2022Recommendation = (
  category: Category,
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none",
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none"
): LungRads2022Recommendation => {
  let recommendation: Recommendation = Recommendation.NoRecommendationPossible

  if (category === Category.Category0) {
    if (problematicExam === "prior-CT-not-available") {
      recommendation = Recommendation.Comparison
    } else if (problematicExam === "not-evaluable") {
      recommendation = Recommendation.Additional
    } else if (problematicExam === "infectious") {
      recommendation = Recommendation.Ct1To3Months
    }
  } else if (category === Category.Category1) {
    recommendation = Recommendation.Ct12Months
  } else if (category === Category.Category2) {
    recommendation = Recommendation.Ct12Months
  } else if (category === Category.Category3) {
    recommendation = Recommendation.Ct6Months
  } else if (category === Category.Category4A) {
    recommendation = Recommendation.Ct3MonthsOrPet
  } else if (category === Category.Category4B) {
    if (featuresSolid === "segmental-airway") {
      recommendation = Recommendation.ClinicalEvaluation
    } else {
      recommendation = Recommendation.TissueSamplingPetFollowUp
    }
  } else if (category === Category.Category4X) {
    recommendation = Recommendation.TissueSamplingPetFollowUp
  }

  return { recommendation }
}
