import { List } from "../../../core/components/structuredReport/List"
import { ListItem } from "../../../core/components/structuredReport/ListItem"
import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { useReportTranslation } from "../../../core/hooks/useReportTranslation"
import { calcAdrenalWashout } from "../utils/adrenalWashoutUtils"

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
      <Paragraph>
        <Statement>{conclusion}</Statement>
      </Paragraph>
      <Paragraph>
        <List>
          <ListItem>Relative washout: {relativeWashout}</ListItem>
          <ListItem>Absolute washout: {absoluteWashout}</ListItem>
        </List>
      </Paragraph>
    </>
  )
}
