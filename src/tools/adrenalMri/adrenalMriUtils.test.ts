import { describe, expect, it } from "vitest"
import { calcAdrenalToSpleenRatio, calcSignalDropout } from "./adrenalMriUtils"

describe("Calculate signal dropout", () => {
  it.each([
    [0, 0, NaN],
    [0, 10, -Infinity],
    [1, 10, -900],
    [50, 30, 40],
    [40, 0, 100],
  ])("should be calculated correctly", (inPhaseAdrenal, oppPhaseAdrenal, result) => {
    expect(calcSignalDropout(inPhaseAdrenal, oppPhaseAdrenal)).toBe(result)
  })
})

describe("Calculate Adrenal-to-Spleen-Ratio", () => {
  it.each([
    [50, 10, 20, 10, 0.4],
    [0, 0, 10, 10, NaN],
  ])(
    "should be calculated correctly",
    (inPhaseAdrenal, oppPhaseAdrenal, inPhaseSpleen, oppPhaseSpleen, result) => {
      expect(
        calcAdrenalToSpleenRatio(inPhaseAdrenal, oppPhaseAdrenal, inPhaseSpleen, oppPhaseSpleen)
      ).toBe(result)
    }
  )
})
