import { makeAdrenalWashoutSuggestion, AdrenalWashoutSuggestion } from "./adrenalWashoutUtils"

describe("calcAdrenalWashout", () => {
  it.each([
    [-1, 0, 0, AdrenalWashoutSuggestion.DensityLowerZeroAdenoma, 0, null],
    [1, 0, 0, AdrenalWashoutSuggestion.DensityLowerTenAdenoma, null, null],
  ])(
    "should calculate correct result",
    (nonEnhanced, portalVenous, delayed, suggestion, absoluteWashout, relativeWashout) => {
      expect(makeAdrenalWashoutSuggestion(nonEnhanced, portalVenous, delayed)).toMatchObject({
        suggestion,
        absoluteWashout,
        relativeWashout,
      })
    }
  )
})
