import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
  makeAdrenalWashoutSuggestion,
  AdrenalWashoutSuggestion,
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
    [-1, 0, 0, AdrenalWashoutSuggestion.DensityLowerZeroAdenoma],
    [1, 0, 0, AdrenalWashoutSuggestion.DensityLowerTenAdenoma],
  ])("should be calculated correctly", (nonEnhanced, portalVenous, delayed, result) => {
    expect(makeAdrenalWashoutSuggestion(nonEnhanced, portalVenous, delayed)).toBe(result)
  })
})
