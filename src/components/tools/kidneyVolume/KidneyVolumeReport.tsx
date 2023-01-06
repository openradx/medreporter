import { List } from "~/components/sr/List"
import { ListItem } from "~/components/sr/ListItem"
import { Paragraph } from "~/components/sr/Paragraph"
import { useReportData } from "~/contexts/ReportDataContext"
import { useReportTranslation } from "~/hooks/useReportTranslation"
import {
  calcSideVolume,
  calcTotalVolume,
  calcTotalVolumeHeightCorrected,
} from "~/utils/kidneyVolumeUtils"

type KidneyVolumeData = {
  rightCoronal: number | null
  rightSagittal: number | null
  rightWidth: number | null
  rightDepth: number | null
  leftCoronal: number | null
  leftSagittal: number | null
  leftWidth: number | null
  leftDepth: number | null
  patientHeight: number | null
  patientAge: number | null
}

export const KidneyVolumeReport = () => {
  const {
    rightCoronal,
    rightSagittal,
    rightWidth,
    rightDepth,
    leftCoronal,
    leftSagittal,
    leftWidth,
    leftDepth,
    patientHeight,
    patientAge,
  } = useReportData(true) as KidneyVolumeData
  const { t } = useReportTranslation()
  let resultRightVolume = t("KidneyVolume.required")
  if (
    rightCoronal !== null &&
    rightSagittal !== null &&
    rightWidth !== null &&
    rightDepth !== null
  ) {
    const rightVolume = calcSideVolume(rightCoronal, rightSagittal, rightWidth, rightDepth)
    resultRightVolume = t("KidneyVolume.value", { value: rightVolume.toFixed(2) })
  }

  let resultLeftVolume = t("KidneyVolume.required")
  if (leftCoronal !== null && leftSagittal !== null && leftWidth !== null && leftDepth !== null) {
    const leftVolume = calcSideVolume(leftCoronal, leftSagittal, leftWidth, leftDepth)
    resultLeftVolume = t("KidneyVolume.value", { value: leftVolume.toFixed(2) })
  }

  let resultTotalVolume = t("KidneyVolume.required")
  if (
    rightCoronal !== null &&
    rightSagittal !== null &&
    rightWidth !== null &&
    rightDepth !== null &&
    leftCoronal !== null &&
    leftSagittal !== null &&
    leftWidth !== null &&
    leftDepth !== null
  ) {
    const totalVolume = calcTotalVolume(
      rightCoronal,
      rightSagittal,
      rightWidth,
      rightDepth,
      leftCoronal,
      leftSagittal,
      leftWidth,
      leftDepth
    )
    resultTotalVolume = t("KidneyVolume.value", { value: totalVolume.toFixed(2) })
  }

  let resultTotalVolumeHeightCorrected = t("KidneyVolume.required")
  if (
    rightCoronal !== null &&
    rightSagittal !== null &&
    rightWidth !== null &&
    rightDepth !== null &&
    leftCoronal !== null &&
    leftSagittal !== null &&
    leftWidth !== null &&
    leftDepth !== null &&
    patientHeight !== null &&
    patientAge !== null
  ) {
    if (patientAge >= 15 && patientAge <= 80) {
      const totalVolumeHeightCorrected = calcTotalVolumeHeightCorrected(
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
      resultTotalVolumeHeightCorrected = t("KidneyVolume.value", {
        value: totalVolumeHeightCorrected.toFixed(2),
      })
    } else {
      resultTotalVolumeHeightCorrected = t("KidneyVolume.wrongAge")
    }
  }
  return (
    <>
      <Paragraph>
        <List>
          <ListItem>
            {t("KidneyVolume.resultRight")}
            {resultRightVolume}
          </ListItem>
          <ListItem>
            {t("KidneyVolume.resultLeft")}
            {resultLeftVolume}
          </ListItem>
          <ListItem>
            {t("KidneyVolume.resultTotal")}
            {resultTotalVolume}
          </ListItem>
          <ListItem>
            {t("KidneyVolume.resultTotalHeightCorrected")}
            {resultTotalVolumeHeightCorrected}
          </ListItem>
        </List>
      </Paragraph>
    </>
  )
}
