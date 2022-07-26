import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { calcCKDEPI, calcCockcroft, calcMayo } from "../utils/gfrUtils"

type GFR = {
  creatinine: number | null
  age: number | null
  weight: number | null
  gender: "male" | "female" | null
  ethnicity: "africanAmerican" | "others" | null
}

export const GFRReport = () => {
  const { creatinine, age, weight, gender, ethnicity } = useReportData(true) as GFR
  let ckdepi = "Creatinine, age, gender and ethnicity are required"
  if (creatinine !== null && age !== null && gender !== null && ethnicity !== null) {
    const result = calcCKDEPI(creatinine, age, gender, ethnicity)
    ckdepi = result.toFixed(2)
  }

  let cockcroft = "Creatinine, age, weight and gender are required"
  if (creatinine !== null && age !== null && weight !== null && gender !== null) {
    const result = calcCockcroft(creatinine, age, weight, gender)
    cockcroft = result.toFixed(2)
  }

  let mayo = "Creatinine, age and gender are required"
  if (creatinine !== null && age !== null && gender !== null) {
    const result = calcMayo(creatinine, age, gender)
    mayo = result.toFixed(2)
  }

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
