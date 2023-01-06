import { describe, expect, it } from "vitest"
import {
  calcSideVolume,
  calcTotalVolume,
  calcTotalVolumeHeightCorrected,
} from "./kidneyVolumeUtils"

describe("Calculate Volume for one side", () => {
  it.each<[number, number, number, number, number]>([
    [10, 10, 10, 10, 524],
    [10, 15, 15, 7, 687.75],
  ])("should calculate correctly", (coronal, sagittal, width, depth, sideVolume) => {
    expect(calcSideVolume(coronal, sagittal, width, depth)).toBe(sideVolume)
  })
})

describe("Calculate Volume for both sides", () => {
  it.each<[number, number, number, number, number, number, number, number, number]>([
    [10, 10, 10, 10, 10, 10, 10, 10, 1048],
    [10, 15, 15, 7, 10, 15, 15, 7, 1375.5],
  ])(
    "should calculate correctly",
    (
      rightCoronal,
      rightSagittal,
      rightWidth,
      rightDepth,
      leftCoronal,
      leftSagittal,
      leftWidth,
      leftDepth,
      totalVolume
    ) => {
      expect(
        calcTotalVolume(
          rightCoronal,
          rightSagittal,
          rightWidth,
          rightDepth,
          leftCoronal,
          leftSagittal,
          leftWidth,
          leftDepth
        )
      ).toBe(totalVolume)
    }
  )
})

describe("Calculate Volume for both sides with correction against height", () => {
  it.each<[number, number, number, number, number, number, number, number, number, number]>([
    [10, 10, 10, 10, 10, 10, 10, 10, 1.6, 655],
    [10, 15, 15, 7, 10, 15, 15, 7, 1.5, 917],
  ])(
    "should calculate correctly",
    (
      rightCoronal,
      rightSagittal,
      rightWidth,
      rightDepth,
      leftCoronal,
      leftSagittal,
      leftWidth,
      leftDepth,
      patientHeight,
      totalVolumeHeightCorrected
    ) => {
      expect(
        calcTotalVolumeHeightCorrected(
          rightCoronal,
          rightSagittal,
          rightWidth,
          rightDepth,
          leftCoronal,
          leftSagittal,
          leftWidth,
          leftDepth,
          patientHeight
        )
      ).toBe(totalVolumeHeightCorrected)
    }
  )
})
