import { describe, expect, it } from "vitest"
import {
  calcCKDEPI,
  calcCockcroft,
  calcCounahan,
  calcMayo,
  calcSchwartzOrig,
  calcSchwartzRev,
  Ethnicity,
  Gender,
} from "./gfrUtils"

describe("Calculate CKDEPI", () => {
  it.each<[number, number, Gender, Ethnicity, number]>([
    [0.6, 30, "male", "africanAmerican", 153.9791102249622],
    [1.3, 20, "female", "others", 57.9655685555856],
    [12, 90, "male", "others", 3.3292646745525905],
  ])("should calculate correctly", (creatinine, age, gender, ethnicity, CKDEPI_GFR) => {
    expect(calcCKDEPI(creatinine, age, gender, ethnicity)).toBe(CKDEPI_GFR)
  })
})

describe("Calculate Cockroft", () => {
  it.each<[number, number, number, Gender, number]>([
    [0.6, 30, 80, "female", 173.14814814814815],
    [1.3, 20, 100, "male", 128.2051282051282],
    [2.9, 100, 50, "female", 8.14176245210728],
  ])("should calculate correctly", (creatinine, age, weight, gender, Cockroft_GFR) => {
    expect(calcCockcroft(creatinine, age, weight, gender)).toBe(Cockroft_GFR)
  })
})

describe("Calculate Mayo", () => {
  it.each<[number, number, Gender, number]>([
    [0.6, 30, "female", 116.55054015435175],
    [1.3, 20, "male", 95.64129986524156],
    [15, 20, "female", 6.7486182334774],
  ])("should calculate correctly", (creatinine, age, gender, Mayo_GFR) => {
    expect(calcMayo(creatinine, age, gender)).toBe(Mayo_GFR)
  })
})

describe("Calculate Counahan", () => {
  it.each<[number, number, number]>([
    [0.6, 80, 57.333333333333336],
    [1.3, 110, 36.38461538461538],
    [10, 100, 4.3],
  ])("should calculate correctly", (creatinine, height, Counahan_GFR) => {
    expect(calcCounahan(creatinine, height)).toBe(Counahan_GFR)
  })
})

describe("Calculate Schwartz Rev", () => {
  it.each<[number, number, number]>([
    [0.6, 80, 55.06666666666667],
    [1.3, 110, 34.94615384615385],
    [10, 100, 4.13],
  ])("should calculate correctly", (creatinine, height, Schwartz_Rev_GFR) => {
    expect(calcSchwartzRev(creatinine, height)).toBe(Schwartz_Rev_GFR)
  })
})

describe("Calculate Schwartz Orig", () => {
  it.each<[number, number, number, Gender, number]>([
    [0.6, 80, 10, "female", 73.33333333333334],
    [1.3, 60, 1, "male", 15.23076923076923],
    [10, 150, 13, "male", 10.5],
  ])("should calculate correctly", (creatinine, height, age, gender, Schwartz_Orig_GFR) => {
    expect(calcSchwartzOrig(creatinine, height, age, gender)).toBe(Schwartz_Orig_GFR)
  })
})
