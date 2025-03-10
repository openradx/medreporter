import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import {
  calcSideVolume,
  calcTotalVolume,
  calcTotalVolumeHeightCorrected,
} from "./kidneyVolumeUtils"
import { i18nReport } from "./locales"

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
  } = useStructureData() as KidneyVolumeData
  const { t } = useMicroTranslation(i18nReport)

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
    <Report>
      <Paragraph list title={t("KidneyVolume.result")}>
        <Statement content={`${t("KidneyVolume.resultRight")} ${resultRightVolume}`} />
        <Statement content={`${t("KidneyVolume.resultLeft")} ${resultLeftVolume}`} />
        <Statement content={`${t("KidneyVolume.resultTotal")} ${resultTotalVolume}`} />
        <Statement
          content={`${t(
            "KidneyVolume.resultTotalHeightCorrected"
          )} ${resultTotalVolumeHeightCorrected}`}
        />
      </Paragraph>
    </Report>
  )
}
