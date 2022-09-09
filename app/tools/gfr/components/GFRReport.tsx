import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { useReportTranslation } from "../../../core/hooks/useReportTranslation"
import {
  calcCKDEPI,
  calcCockcroft,
  calcMayo,
  calcCounahan,
  calcSchwartzRev,
  calcSchwartzOrig,
} from "../utils/gfrUtils"

type GFR = {
  creatinine: number | null
  age: number | null
  weight: number | null
  height: number | null
  gender: "male" | "female" | null
  ethnicity: "africanAmerican" | "others" | null
}

export const GFRReport = () => {
  const { creatinine, age, weight, height, gender, ethnicity } = useReportData(true) as GFR
  const { t } = useReportTranslation()
  let ckdepi = t("Gfr.textCkdRequired")
  if (creatinine !== null && age !== null && gender !== null && ethnicity !== null) {
    const result = calcCKDEPI(creatinine, age, gender, ethnicity)
    ckdepi = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let cockcroft = t("Gfr.textCockcroftRequired")
  if (creatinine !== null && age !== null && weight !== null && gender !== null) {
    const result = calcCockcroft(creatinine, age, weight, gender)
    cockcroft = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let mayo = t("Gfr.textMayoRequired")
  if (creatinine !== null && age !== null && gender !== null) {
    const result = calcMayo(creatinine, age, gender)
    mayo = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let counahan = t("Gfr.textCounahanRequired")
  if (creatinine !== null && height !== null) {
    const result = calcCounahan(creatinine, height)
    counahan = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let schwartzRev = t("Gfr.textSchwartzRevRequired")
  if (creatinine !== null && height !== null) {
    const result = calcSchwartzRev(creatinine, height)
    schwartzRev = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let schwartzOrig = t("Gfr.textSchwartzOrigRequired")
  if (creatinine !== null && height !== null && age !== null && gender !== null) {
    const result = calcSchwartzOrig(creatinine, height, age, gender)
    schwartzOrig = `${result.toFixed(2)} ml/min/1,73qm`
  }

  if (age === null) {
    return (
      <>
        <Paragraph>
          <Statement>{t("Gfr.textAgeMissing")}</Statement>
        </Paragraph>
      </>
    )
  }

  if (age >= 18) {
    return (
      <>
        <Paragraph>
          <Statement>CKDEPI: {ckdepi}</Statement>
        </Paragraph>
        <Paragraph>
          <Statement>Cockcroft-Gault: {cockcroft}</Statement>
        </Paragraph>
        <Paragraph>
          <Statement>Mayo: {mayo}</Statement>
        </Paragraph>
      </>
    )
  }

  return (
    <>
      <Paragraph>
        <Statement>Counahan-Barratt: {counahan}</Statement>
      </Paragraph>
      <Paragraph>
        <Statement>Schwartz (rev.): {schwartzRev}</Statement>
      </Paragraph>
      <Paragraph>
        <Statement>Schwartz (orig.): {schwartzOrig}</Statement>
      </Paragraph>
    </>
  )
}
