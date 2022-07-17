import { Count, RiskFactors, Structure } from "../components/Fleischner2017Report"
import { defineFleischner2017, Suggestion } from "./fleischner2017Utils"

describe("defineFleischner2017", () => {
  it.each<[number, number, Structure, Count, RiskFactors, Suggestion]>([
    [3, 2, "solid", "single", "no", Suggestion.NoFollowUp],
    [7, 6, "solid", "single", "no", Suggestion.Ct3To6MonthsAndConsider18To24],
    [9, 8, "solid", "single", "no", Suggestion.Ct3MonthsPETSampling],
    [3, 2, "solid", "single", "yes", Suggestion.OptionalAt12MonthsSuspicious],
    [7, 6, "solid", "single", "yes", Suggestion.Ct3To6MonthsAnd18To24],
    [10, 9, "solid", "single", "yes", Suggestion.Ct3MonthsPETSampling],
    [3, 2, "solid", "multiple", "no", Suggestion.NoFollowUp],
    [7, 6, "solid", "multiple", "no", Suggestion.Ct3To6MonthsAndConsider18To24],
    [10, 9, "solid", "multiple", "no", Suggestion.Ct3To6MonthsAndConsider18To24],
    [3, 2, "solid", "multiple", "yes", Suggestion.OptionalAt12Months],
    [7, 6, "solid", "multiple", "yes", Suggestion.Ct3To6MonthsAnd18To24],
    [10, 9, "solid", "multiple", "yes", Suggestion.Ct3To6MonthsAnd18To24],
    [6, 5, "groundglass", "single", "yes", Suggestion.NoFollowUp],
    [7, 6, "groundglass", "single", "yes", Suggestion.Ct6To12Months2Years5Years],
    [6, 5, "groundglass", "single", "no", Suggestion.NoFollowUp],
    [7, 6, "groundglass", "single", "no", Suggestion.Ct6To12Months2Years5Years],
    [6, 5, "partsolid", "single", "yes", Suggestion.NoFollowUp],
    [7, 6, "partsolid", "single", "yes", Suggestion.Ct3To6MonthsAnnual],
    [6, 5, "partsolid", "single", "no", Suggestion.NoFollowUp],
    [7, 6, "partsolid", "single", "no", Suggestion.Ct3To6MonthsAnnual],
    [6, 5, "groundglass", "multiple", "yes", Suggestion.Ct3To6Months2And4Years],
    [7, 6, "groundglass", "multiple", "yes", Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "partsolid", "multiple", "yes", Suggestion.Ct3To6Months2And4Years],
    [7, 6, "partsolid", "multiple", "yes", Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "groundglass", "multiple", "no", Suggestion.Ct3To6Months2And4Years],
    [7, 6, "groundglass", "multiple", "no", Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "partsolid", "multiple", "no", Suggestion.Ct3To6Months2And4Years],
    [7, 6, "partsolid", "multiple", "no", Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "groundglass", "single", null, Suggestion.NoFollowUp],
    [7, 6, "groundglass", "single", null, Suggestion.Ct6To12Months2Years5Years],
    [6, 5, "groundglass", "single", null, Suggestion.NoFollowUp],
    [7, 6, "groundglass", "single", null, Suggestion.Ct6To12Months2Years5Years],
    [6, 5, "partsolid", "single", null, Suggestion.NoFollowUp],
    [7, 6, "partsolid", "single", null, Suggestion.Ct3To6MonthsAnnual],
    [6, 5, "partsolid", "single", null, Suggestion.NoFollowUp],
    [7, 6, "partsolid", "single", null, Suggestion.Ct3To6MonthsAnnual],
    [6, 5, "groundglass", "multiple", null, Suggestion.Ct3To6Months2And4Years],
    [7, 6, "groundglass", "multiple", null, Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "partsolid", "multiple", null, Suggestion.Ct3To6Months2And4Years],
    [7, 6, "partsolid", "multiple", null, Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "groundglass", "multiple", null, Suggestion.Ct3To6Months2And4Years],
    [7, 6, "groundglass", "multiple", null, Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "partsolid", "multiple", null, Suggestion.Ct3To6Months2And4Years],
    [7, 6, "partsolid", "multiple", null, Suggestion.Ct3To6MonthsMostSuspicious],
    [6, 5, "groundglass", null, "yes", Suggestion.NoFollowUp],
    [6, 5, "groundglass", null, "no", Suggestion.NoFollowUp],
    [6, 5, "partsolid", null, "yes", Suggestion.NoFollowUp],
    [6, 5, "partsolid", null, "no", Suggestion.NoFollowUp],
    [6, 5, "groundglass", null, null, Suggestion.NoFollowUp],
    [6, 5, "groundglass", null, null, Suggestion.NoFollowUp],
    [6, 5, "partsolid", null, null, Suggestion.NoFollowUp],
    [6, 5, "partsolid", null, null, Suggestion.NoFollowUp],
  ])(
    "should give correct suggestion",
    (longaxis, shortaxis, structure, count, riskFactors, suggestion) => {
      expect(
        defineFleischner2017(longaxis, shortaxis, structure, count, riskFactors)
      ).toMatchObject({
        suggestion,
      })
    }
  )
})
