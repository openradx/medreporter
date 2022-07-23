import { List } from "../../../core/components/structuredReport/List"
import { ListItem } from "../../../core/components/structuredReport/ListItem"
import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import { useReportTranslation } from "../../../core/hooks/useReportTranslation"
import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
  makeAdrenalWashoutSuggestion,
} from "../utils/adrenalWashoutUtils"

type AdrenalWashoutData = {
  nonEnhanced: number | null
  portalVenous: number | null
  delayed: number | null
}

export const AdrenalWashoutReport = () => {
  const { nonEnhanced, portalVenous, delayed } = useReportData(true) as AdrenalWashoutData
  const { t } = useReportTranslation()

  const absoluteWashout = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
  const relativeWashout = calcRelativeAdrenalWashout(portalVenous, delayed)
  const suggestion = makeAdrenalWashoutSuggestion(
    nonEnhanced,
    portalVenous,
    delayed,
    absoluteWashout,
    relativeWashout
  )

  const conclusion = t(suggestion)

  return (
    <>
      <Paragraph>
        <Statement>{conclusion}</Statement>
      </Paragraph>
      <Paragraph>
        <List>
          <ListItem>
            {t("absoluteWashout")}: {absoluteWashout ?? t("notCalculable")}
          </ListItem>
          <ListItem>
            {t("relativeWashout")}: {relativeWashout ?? t("notCalculable")}
          </ListItem>
        </List>
      </Paragraph>
    </>
  )
}
