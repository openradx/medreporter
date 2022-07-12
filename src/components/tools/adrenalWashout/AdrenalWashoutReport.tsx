import { useReportData } from "../../../contexts/ReportDataContext"
import { useReportTranslation } from "../../../hooks/useReportTranslation"
import { calcAdrenalWashout } from "../../../utils/adrenalWashoutUtils"
import { Paragraph } from "../../structuredReport/Paragraph"
import { Statement } from "../../structuredReport/Statement"

type AdrenalWashoutData = {
  nonEnhanced: number | null
  portalVenous: number | null
  delayed: number | null
}

export const AdrenalWashoutReport = () => {
  const { nonEnhanced, portalVenous, delayed } = useReportData(true) as AdrenalWashoutData
  const { t } = useReportTranslation()

  const { suggestion, absoluteWashout, relativeWashout } = calcAdrenalWashout(
    nonEnhanced,
    portalVenous,
    delayed
  )

  const conclusion = t(suggestion)

  return (
    <>
      Relative washout: {relativeWashout}
      Absolute washout: {absoluteWashout}
      {conclusion}
      <Paragraph>
        <Statement fieldId="foobar">fooo</Statement>
      </Paragraph>
      <Paragraph>
        <Statement fieldId="foobar">bar</Statement>
      </Paragraph>
    </>
  )
}
