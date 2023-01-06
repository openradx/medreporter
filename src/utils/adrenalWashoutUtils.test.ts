import { describe, expect, it } from "vitest"
import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
  makeAdrenalWashoutSuggestion,
  AdrenalWashoutSuggestion,
} from "./adrenalWashoutUtils"

describe("Calculate absolute adrenal washout", () => {
  it.each([[0, 0, 0, NaN]])(
    "should be calculated correctly",
    (nonEnhanced, portalVenous, delayed, result) => {
      expect(calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)).toBe(result)
    }
  )
})

describe("Calculate relative adrenal washout", () => {
  it.each([[0, 0, NaN]])("shout be calculated correctly", (portalVenous, delayed, result) => {
    expect(calcRelativeAdrenalWashout(portalVenous, delayed)).toBe(result)
  })
})

describe("Adrenal washout suggestions", () => {
  it.each([
    [null, null, null, [AdrenalWashoutSuggestion.MissingValues]],
    [-1, null, null, [AdrenalWashoutSuggestion.DensityLowerZeroAdenoma]],
    [0, null, null, [AdrenalWashoutSuggestion.DensityLowerTenAdenoma]],
  ])("should be calculated correctly", (nonEnhanced, portalVenous, delayed, result) => {
    expect(makeAdrenalWashoutSuggestion(nonEnhanced, portalVenous, delayed)).toEqual(result)
  })
})
