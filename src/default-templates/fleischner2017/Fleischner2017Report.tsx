import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import { defineFleischner2017 } from "./fleischner2017Utils"
import { i18nReport } from "./locales"

export type Structure = "solid" | "groundglass" | "partsolid"
export type Count = "single" | "multiple" | null
export type RiskFactors = "yes" | "no" | null

type Fleischner2017Data = {
  longaxis: number
  shortaxis: number
  structure: Structure
  count: Count
  riskFactors: RiskFactors
}

export const Fleischner2017Report = () => {
  const { longaxis, shortaxis, structure, count, riskFactors } =
    useStructureData() as Fleischner2017Data
  const { t } = useMicroTranslation(i18nReport)

  const { suggestion } = defineFleischner2017(longaxis, shortaxis, structure, count, riskFactors)

  const conclusion = t(suggestion)

  return (
    <Report>
      <Paragraph>
        {t("Fleischner2017.textRecommendation")}: {conclusion}
      </Paragraph>
    </Report>
  )
}
