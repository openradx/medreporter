import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { useReportData } from "../../../core/contexts/ReportDataContext"
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
  let ckdepi = "Creatinine, age, gender and ethnicity are required"
  if (age !== null && age < 18) {
    ckdepi =
      "The CKD-EPI equation is used for adults, for children use the Counahan-Barratt equation or Schwartz equation instead."
  } else if (creatinine !== null && age !== null && gender !== null && ethnicity !== null) {
    const result = calcCKDEPI(creatinine, age, gender, ethnicity)
    ckdepi = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let cockcroft = "Creatinine, age, weight and gender are required"
  if (age !== null && age < 18) {
    cockcroft =
      "The Cockroft-Gault equation is used for adults, for children use the Counahan-Barratt equation or Schwartz equation instead."
  } else if (creatinine !== null && age !== null && weight !== null && gender !== null) {
    const result = calcCockcroft(creatinine, age, weight, gender)
    cockcroft = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let mayo = "Creatinine, age and gender are required"
  if (age !== null && age < 18) {
    mayo =
      "The Mayo Clinic equation is used for adults, for children use the Counahan-Barratt equation or Schwartz equation instead."
  } else if (creatinine !== null && age !== null && gender !== null) {
    const result = calcMayo(creatinine, age, gender)
    mayo = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let counahan = "Creatinine and height are required"
  if (age !== null && age >= 18) {
    counahan =
      "The Counahan-Barratt equation is used for children, for adults use the Mayo Clinic equation, the CKD-EPI equation or the Cockroft-Gault equation instead."
  } else if (creatinine !== null && height !== null) {
    const result = calcCounahan(creatinine, height)
    counahan = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let schwartzRev = "Creatinine and height are required"
  if (age !== null && age >= 18) {
    schwartzRev =
      "The Schwartz equation is used for children, for adults use the Mayo Clinic equation, the CKD-EPI equation or the Cockroft-Gault equation instead."
  } else if (creatinine !== null && height !== null) {
    const result = calcSchwartzRev(creatinine, height)
    schwartzRev = `${result.toFixed(2)} ml/min/1,73qm`
  }

  let schwartzOrig = "Creatinine, height, age and gender are required"
  if (age !== null && age >= 18) {
    schwartzOrig =
      "The Schwartz equation is used for children, for adults use the Mayo Clinic equation, the CKD-EPI equation or the Cockroft-Gault equation instead."
  } else if (creatinine !== null && height !== null && age !== null && gender !== null) {
    const result = calcSchwartzOrig(creatinine, height, age, gender)
    schwartzOrig = `${result.toFixed(2)} ml/min/1,73qm`
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
