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

  let absoluteWashoutText = t("AdrenalWashout.textAbsoluteWashoutRequirements")
  if (nonEnhanced !== null && portalVenous !== null && delayed !== null) {
    const result = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
    if (Number.isNaN(result) || !Number.isFinite(result) || result < 0 || result > 100) {
      absoluteWashoutText = t("AdrenalWashout.resultAbsoluteWashoutInvalid")
    } else {
      absoluteWashoutText = t("AdrenalWashout.resultAbsoluteWashoutWithValue", {
        value: result.toFixed(0),
      })
    }
  }

  let relativeWashoutText = t("AdrenalWashout.textRelativeWashoutRequirements")
  if (portalVenous !== null && delayed != null) {
    const result = calcRelativeAdrenalWashout(portalVenous, delayed)
    if (Number.isNaN(result) || !Number.isFinite(result) || result < 0 || result > 100) {
      relativeWashoutText = t("AdrenalWashout.resultRelativeWashoutInvalid")
    } else {
      relativeWashoutText = t("AdrenalWashout.resultRelativeWashoutWithValue", {
        value: result.toFixed(0),
      })
    }
  }

  const suggestions = makeAdrenalWashoutSuggestion(nonEnhanced, portalVenous, delayed)

  return (
    <>
      <Paragraph>
        <List>
          <ListItem>{absoluteWashoutText}</ListItem>
          <ListItem>{relativeWashoutText}</ListItem>
        </List>
      </Paragraph>
      <Paragraph>
        {suggestions.map((suggestion, index, array) => (
          <Statement key={suggestion} last={index === array.length - 1}>
            {t(suggestion)}
          </Statement>
        ))}
      </Paragraph>
    </>
  )
}
