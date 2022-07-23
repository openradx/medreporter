import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
  makeSuggestion,
  Suggestion,
} from "./adrenalWashoutUtils"

describe("Calculate absolute adrenal washout", () => {
  it.each([[null, null, null, null]])(
    "should be calculated correctly",
    (nonEnhanced, portalVenous, delayed, result) => {
      expect(calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)).toBe(result)
    }
  )
})

describe("Calculate relative adrenal washout", () => {
  it.each([[null, null, null]])(
    "shout be calculated correctly",
    (portalVenous, delayed, result) => {
      expect(calcRelativeAdrenalWashout(portalVenous, delayed)).toBe(result)
    }
  )
})

describe("Adrenal washout suggestions", () => {
  it.each([
    [-1, 0, 0, 0, null, Suggestion.DensityLowerZeroAdenoma],
    [1, 0, 0, 0, null, Suggestion.DensityLowerTenAdenoma],
  ])(
    "should be calculated correctly",
    (nonEnhanced, portalVenous, delayed, absoluteWashout, relativeWashout, result) => {
      expect(
        makeSuggestion(nonEnhanced, portalVenous, delayed, absoluteWashout, relativeWashout)
      ).toBe(result)
    }
  )
})
