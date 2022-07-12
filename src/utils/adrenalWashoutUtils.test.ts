import { calcAdrenalWashout, Suggestion } from "./adrenalWashoutUtils"

describe("calcAdrenalWashout", () => {
  it.each([
    [-1, 0, 0, Suggestion.DensityLowerZeroAdenoma, 0, null],
    [1, 0, 0, Suggestion.DensityLowerTenAdenoma, null, null],
  ])(
    "should calculate correct result",
    (nonEnhanced, portalVenous, delayed, suggestion, absoluteWashout, relativeWashout) => {
      expect(calcAdrenalWashout(nonEnhanced, portalVenous, delayed)).toMatchObject({
        suggestion,
        absoluteWashout,
        relativeWashout,
      })
    }
  )
})
