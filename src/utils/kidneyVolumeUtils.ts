export function calcSideVolume(
  coronal: number,
  sagittal: number,
  width: number,
  depth: number
): number {
  return ((coronal + sagittal) / 2) * width * depth * 0.524
}

export function calcTotalVolume(
  rightCoronal: number,
  rightSagittal: number,
  rightWidth: number,
  rightDepth: number,
  leftCoronal: number,
  leftSagittal: number,
  leftWidth: number,
  leftDepth: number
): number {
  return (
    calcSideVolume(rightCoronal, rightSagittal, rightWidth, rightDepth) +
    calcSideVolume(leftCoronal, leftSagittal, leftWidth, leftDepth)
  )
}

export function calcTotalVolumeHeightCorrected(
  rightCoronal: number,
  rightSagittal: number,
  rightWidth: number,
  rightDepth: number,
  leftCoronal: number,
  leftSagittal: number,
  leftWidth: number,
  leftDepth: number,
  patientHeight: number
): number {
  return (
    calcTotalVolume(
      rightCoronal,
      rightSagittal,
      rightWidth,
      rightDepth,
      leftCoronal,
      leftSagittal,
      leftWidth,
      leftDepth
    ) / patientHeight
  )
}
