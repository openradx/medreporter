import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { calcCKDEPI, calcCockcroft, calcMayo } from "../utils/gfrUtils"

type GFR = {
  creatinine: number
  age: number
  weight: number
  gender: "male" | "female"
  ethnicity: "africanAmerican" | "others"
}

export const GFRReport = () => {
  const { creatinine, age, weight, gender, ethnicity } = useReportData(true) as GFR

  const CKDEPI = calcCKDEPI({ creatinine, age, weight, gender, ethnicity })
  const Mayo = calcMayo({ creatinine, age, weight, gender, ethnicity })
  const Cockcroft = calcCockcroft({ creatinine, age, weight, gender, ethnicity })

  return (
    <>
      <Paragraph>CKDEPI: {CKDEPI?.toFixed(2)}</Paragraph>
      <Paragraph>Mayo: {Mayo?.toFixed(2)}</Paragraph>
      <Paragraph>Cockcroft-Gault: {Cockcroft?.toFixed(2)}</Paragraph>
    </>
  )
}
