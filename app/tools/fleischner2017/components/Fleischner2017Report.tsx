import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { useReportTranslation } from "../../../core/hooks/useReportTranslation"
import { defineFleischner2017 } from "../utils/fleischner2017Utils"

type Fleischner2017Data = {
  longaxis: number
  shortaxis: number
  structure: "solid" | "groundglass" | "partsolid"
  count: "single" | "multiple"
  riskFactors: boolean
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
        {t("recommendation")}: {conclusion}
      </Paragraph>
    </>
  )
}
