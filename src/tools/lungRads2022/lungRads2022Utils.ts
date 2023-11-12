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

export type LungRads2022Input = {
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none" | null
  timepoint: "baseline" | "follow-up" | null
  previous: "0" | "1" | "2" | "3" | "4A" | "4B" | "4X" | null
  nodule: boolean
  benignFeatures: "calcification" | "fat" | "none" | null
  structure: "solid" | "groundglass" | "partsolid" | null
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none" | null
  longaxis: number | null
  shortaxis: number | null
  longaxisSolid: number | null
  shortaxisSolid: number | null
  dynamic: "new" | "stable" | "slowlyGrowing" | "growing" | null
  timeOfDynamicNodule: number | null
  cyst: boolean
  wall: "thin" | "thick" | null
  formation: "unilocular" | "multilocular" | null
  dynamicUnilocular: "stable" | "cyst-growing" | "wall-growing" | null
  dynamicMultilocular: "stable" | "cyst-growing" | "newly-multilocular" | "increased-solid" | null
  timeOfDynamicCyst: number | null
  suspicious: ("spiculation" | "lymphadenopathy" | "metastasis" | "GGN-doubled" | "other")[]
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

export const defineLungRads2022 = ({
  problematicExam,
  timepoint,
  previous,
  nodule,
  benignFeatures,
  structure,
  featuresSolid,
  longaxis,
  shortaxis,
  longaxisSolid,
  shortaxisSolid,
  dynamic,
  timeOfDynamicNodule,
  cyst,
  wall,
  formation,
  dynamicUnilocular,
  dynamicMultilocular,
  timeOfDynamicCyst,
  suspicious,
}: LungRads2022Input): Category => {
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
    } else if (dynamic === "slowlyGrowing" && structure !== "groundglass") {
      category = Category.Category4B
    } else if (
      featuresSolid === "subsegmental-airway" &&
      (timepoint === "baseline" || dynamic === "new" || dynamic === "stable")
    ) {
      category = Category.Category2
    } else if (featuresSolid === "segmental-airway") {
      if (timepoint === "baseline") {
        category = Category.Category4A
      } else if (dynamic === "stable" || dynamic === "growing" || dynamic === "new") {
        // TODO: new solid nodule associated to segmental airway does not exist
        category = Category.Category4B
      }
    } else if (
      structure === "solid" &&
      (featuresSolid === "none" || featuresSolid === "smooth-margins")
    ) {
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
            (dynamic === "slowlyGrowing" || dynamic === "stable")))
      ) {
        category = Category.Category2
      } else if (
        averageDiameter !== null &&
        averageDiameter >= 30 &&
        (timepoint === "baseline" ||
          (timepoint === "follow-up" && (dynamic === "growing" || dynamic === "new")))
      ) {
        // TODO: growing GGN is not in classification
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
        } else if (timepoint === "follow-up" && dynamicUnilocular === "cyst-growing") {
          category = Category.Category3
        }
      }
    } else if (formation === "multilocular") {
      if (timepoint === "baseline") {
        category = Category.Category4A
      } else if (timepoint === "follow-up") {
        if (dynamicMultilocular === "newly-multilocular") {
          category = Category.Category4A
        } else if (
          dynamicMultilocular === "increased-solid" ||
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
    if (
      (timeOfDynamicNodule && timeOfDynamicNodule >= 3) ||
      (timeOfDynamicCyst && timeOfDynamicCyst >= 3)
    ) {
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
    if (
      (timeOfDynamicNodule && timeOfDynamicNodule >= 6) ||
      (timeOfDynamicCyst && timeOfDynamicCyst >= 6)
    ) {
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

  return category
}

export enum Recommendation {
  NoRecommendationPossible = "LungRads2022.noRecommendationPossible",
  Comparison = "LungRads2022.comparison",
  Additional = "LungRads2022.additional",
  Ct1To3Months = "LungRads2022.ct1To3Months",
  Ct12Months = "LungRads2022.ct12Months",
  Ct6Months = "LungRads2022.ct6Months",
  Ct3MonthsOrPet = "LungRads2022.ct3MonthsOrPet",
  ClinicalEvaluation = "LungRads2022.clinicalEvaluation",
  TissueSamplingPetFollowUp = "LungRads2022.tissueSamplingPetFollowUp",
  SpecificFinding = "LungRads2022.specificFinding",
}

export const giveLungRads2022Recommendation = (
  category: Category,
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none" | null,
  structure: "solid" | "groundglass" | "partsolid" | null,
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none" | null
): Recommendation => {
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
    if (structure === "solid" && featuresSolid === "segmental-airway") {
      recommendation = Recommendation.ClinicalEvaluation
    } else {
      recommendation = Recommendation.TissueSamplingPetFollowUp
    }
  } else if (category === Category.Category4X) {
    recommendation = Recommendation.TissueSamplingPetFollowUp
  }

  return recommendation
}

/**
 * TODO:
 * - S Modifier in Utils
 */
