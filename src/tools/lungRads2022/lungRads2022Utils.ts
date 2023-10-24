export function calcAverageDiameter(longaxis: number, shortaxis: number): number {
  return (longaxis + shortaxis) / 2
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
  timepoint: "baseline" | "follow-up",
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none",
  nodule: boolean,
  benignFeatures: "calcification" | "fat" | "none",
  structure: "solid" | "groundglass" | "partsolid",
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none",
  longaxis: number,
  shortaxis: number,
  longaxisSolid: number,
  shortaxisSolid: number,
  dynamic: "new" | "stable" | "slowly-growing" | "growing" | "decreasing",
  cyst: boolean,
  wall: "thin" | "thick",
  formation: "unilocular" | "multilocular",
  growingUnilocular: "stable" | "cyst-growing" | "wall-growing",
  growingMultilocular: "stable" | "cyst-growing" | "newly-multilocular" | "increased-solid",
  suspicious: "spiculation" | "lymphadenopathy" | "metastasis" | "other"
): LungRads2022Result => {
  const averageDiameter: number | undefined = calcAverageDiameter(longaxis, shortaxis)
  const averageDiameterSolid: number | undefined = calcAverageDiameter(
    longaxisSolid,
    shortaxisSolid
  )
  let category: Category = Category.NoCategory

  if (problematicExam && problematicExam !== "none") {
    category = Category.Category0
  } else if (!nodule && !cyst && problematicExam === "none") {
    category = Category.Category1
  } else if (nodule) {
    if (benignFeatures === "calcification" || benignFeatures === "fat") {
      category = Category.Category1
    } else if (featuresSolid === "smooth-margins" && averageDiameter < 10) {
      category = Category.Category2
    } else if (featuresSolid === "subsegmental-airway") {
      category = Category.Category2
    } else if (featuresSolid === "segmental-airway") {
      category = Category.Category4A
    } else if (structure === "solid") {
      if (timepoint === "baseline") {
        if (averageDiameter < 6) {
          category = Category.Category2
        } else if (averageDiameter >= 6 && averageDiameter < 8) {
          category = Category.Category3
        } else if (averageDiameter >= 8 && averageDiameter < 15) {
          category = Category.Category4A
        } else if (averageDiameter >= 15) {
          category = Category.Category4B
        }
      } else if (timepoint === "follow-up") {
        if (dynamic === "growing") {
          if (averageDiameter < 8) {
            category = Category.Category4A
          } else if (averageDiameter >= 8) {
            category = Category.Category4B
          }
        } else if (dynamic === "new") {
          if (averageDiameter < 4) {
            category = Category.Category2
          } else if (averageDiameter >= 4 && averageDiameter < 6) {
            category = Category.Category3
          } else if (averageDiameter >= 6 && averageDiameter < 8) {
            category = Category.Category4A
          } else if (averageDiameter >= 8) {
            category = Category.Category4B
          }
        }
      }
    } else if (structure === "partsolid") {
      if (timepoint === "baseline") {
        if (averageDiameter < 6) {
          category = Category.Category2
        } else if (averageDiameter >= 6) {
          if (averageDiameterSolid < 6) {
            category = Category.Category3
          } else if (averageDiameterSolid >= 6 && averageDiameterSolid < 8) {
            category = Category.Category4A
          } else if (averageDiameterSolid >= 8) {
            category = Category.Category4B
          }
        }
      } else if (timepoint === "follow-up") {
        if (dynamic === "new" || dynamic === "growing") {
          if (averageDiameter < 6) {
            category = Category.Category3
          } else if (averageDiameter >= 6) {
            if (averageDiameterSolid < 4) {
              category = Category.Category4A
            } else if (averageDiameterSolid >= 4) {
              category = Category.Category4B
            }
          }
        }
      }
    } else if (structure === "groundglass") {
      if (averageDiameter < 30) {
        category = Category.Category2
      } else if (averageDiameter >= 30) {
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
        } else if (timepoint === "follow-up" && growingUnilocular === "wall-growing") {
          category = Category.Category4B
        }
      }
    } else if (formation === "multilocular") {
      if (timepoint === "baseline") {
        category = Category.Category4A
      } else if (timepoint === "follow-up") {
        if (
          growingMultilocular === "increased-solid" ||
          growingMultilocular === "newly-multilocular" ||
          growingMultilocular === "cyst-growing"
        ) {
          category = Category.Category4B
        }
      }
    }
  }
  if (
    (category === Category.Category3 ||
      category === Category.Category4A ||
      category === Category.Category4B) &&
    suspicious.length > 0
  ) {
    category = Category.Category4X
  }
  return { category }
}
