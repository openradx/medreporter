export function calcAverageDiameter(longaxis: number, shortaxis: number): number {
  return (longaxis + shortaxis) / 2
}

export enum Suggestion {
  NoSuggestionPossible = "noSuggestionPossible",
  OptionalAt12MonthsSuspicious = "suggestionOptionalAt12MonthsSuspicious",
  NoFollowUp = "suggestionNoFollowUp",
  Ct6To12MonthsAnd18To24 = "suggestionCt6To12MonthsAnd18To24",
  Ct6To12MonthsAndConsider18To24 = "suggestionCt6to12MonthsAndConsider18To24",
  Ct3MonthsPETSampling = "suggestionCt3MonthsPETSampling",
  OptionalAt12Months = "suggestionOptionalAt12Months",
  Ct3To6MonthsAnd18To24 = "suggestionCt3To6MonthsAnd18To24",
  Ct3To6MonthsAndConsider18To24 = "suggestionCt3To6MonthsAndConsider18To24",
  Ct6To12Months2Years5Years = "suggestionCt6To12Months2Years5Years",
  Ct3To6MonthsAnnual = "suggestionCt3To6MonthsAnnual",
  Ct3To6Months2And4Years = "suggestionCt3To6Months2And4Years",
  Ct3To6MonthsMostSuspicious = "suggestionCt3To6MonthsMostSuspicious",
}

export type Fleischner2017Result = {
  suggestion: Suggestion
}

export const defineFleischner2017 = (
  longaxis: number,
  shortaxis: number,
  structure: "solid" | "groundglass" | "partsolid",
  count: "single" | "multiple" | null,
  riskFactors: "yes" | "no" | null
): Fleischner2017Result => {
  const averageDiameter: number | undefined = calcAverageDiameter(longaxis, shortaxis)
  const risk = riskFactors === "yes"
  let suggestion: Suggestion = Suggestion.NoSuggestionPossible

  if (structure === "solid") {
    if (count === "single") {
      if (averageDiameter < 6) {
        if (risk) {
          suggestion = Suggestion.OptionalAt12MonthsSuspicious
        }
        if (!risk) {
          suggestion = Suggestion.NoFollowUp
        }
      } else if (averageDiameter >= 6 && averageDiameter <= 8) {
        if (risk) {
          suggestion = Suggestion.Ct3To6MonthsAnd18To24
        }
        if (!risk) {
          suggestion = Suggestion.Ct3To6MonthsAndConsider18To24
        }
      } else if (averageDiameter > 8) {
        suggestion = Suggestion.Ct3MonthsPETSampling
      }
    } else if (count === "multiple") {
      if (averageDiameter < 6) {
        if (risk) {
          suggestion = Suggestion.OptionalAt12Months
        }
        if (!risk) {
          suggestion = Suggestion.NoFollowUp
        }
      } else if (averageDiameter >= 6) {
        if (risk) {
          suggestion = Suggestion.Ct3To6MonthsAnd18To24
        }
        if (!risk) {
          suggestion = Suggestion.Ct3To6MonthsAndConsider18To24
        }
      }
    }
  } else if (count === "multiple") {
    if (averageDiameter < 6) {
      suggestion = Suggestion.Ct3To6Months2And4Years
    }
    if (averageDiameter >= 6) {
      suggestion = Suggestion.Ct3To6MonthsMostSuspicious
    }
  } else if (averageDiameter < 6 && (structure === "partsolid" || structure === "groundglass")) {
    suggestion = Suggestion.NoFollowUp
  } else if (count === "single") {
    if (averageDiameter >= 6) {
      if (structure === "groundglass") {
        suggestion = Suggestion.Ct6To12Months2Years5Years
      }
      if (structure === "partsolid") {
        suggestion = Suggestion.Ct3To6MonthsAnnual
      }
    }
  }
  return { suggestion }
}
