import { Paragraph } from "~/components/sr/Paragraph"
import { useReportData } from "~/contexts/ReportDataContext"
import { useReportTranslation } from "~/hooks/useReportTranslation"
import { defineFleischner2017 } from "~/utils/fleischner2017Utils"

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
  const { longaxis, shortaxis, structure, count, riskFactors } = useReportData(
    true
  ) as Fleischner2017Data
  const { t } = useReportTranslation()

  const { suggestion } = defineFleischner2017(longaxis, shortaxis, structure, count, riskFactors)

  const conclusion = t(suggestion)

  return (
    <>
      <Paragraph>
        {t("Fleischner2017.textRecommendation")}: {conclusion}
      </Paragraph>
    </>
  )
}
