import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import {
  calcCKDEPI,
  calcCockcroft,
  calcMayo,
  calcCounahan,
  calcSchwartzRev,
  calcSchwartzOrig,
} from "./gfrUtils"
import { i18nReport } from "./locales"

type Gfr = {
  creatinine: number | null
  age: number | null
  weight: number | null
  height: number | null
  gender: "male" | "female" | null
  ethnicity: "africanAmerican" | "others" | null
}

export const GfrReport = () => {
  const { creatinine, age, weight, height, gender, ethnicity } = useStructureData() as Gfr
  const { t } = useMicroTranslation(i18nReport)

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
      <Report>
        <Statement content={t("Gfr.textAgeMissing")} />
      </Report>
    )
  }

  if (age >= 18) {
    return (
      <Report>
        <Paragraph>
          <Statement content={`CKDEPI: ${ckdepi}`} />
        </Paragraph>
        <Paragraph>
          <Statement content={`Cockcroft-Gault: ${cockcroft}`} />
        </Paragraph>
        <Paragraph>
          <Statement content={`Mayo: ${mayo}$`} />
        </Paragraph>
      </Report>
    )
  }

  return (
    <Report>
      <Paragraph>
        <Statement content={`Counahan-Barratt: ${counahan}`} />
      </Paragraph>
      <Paragraph>
        <Statement content={`Schwartz (rev.): ${schwartzRev}`} />
      </Paragraph>
      <Paragraph>
        <Statement content={`Schwartz (orig.): ${schwartzOrig}`} />
      </Paragraph>
    </Report>
  )
}
