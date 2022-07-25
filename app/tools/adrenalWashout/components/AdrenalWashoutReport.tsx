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

  const suggestion = makeAdrenalWashoutSuggestion(nonEnhanced, portalVenous, delayed)

  let absoluteWashoutText = t("absoluteWashoutRequirements")
  if (nonEnhanced !== null && portalVenous !== null && delayed !== null) {
    const result = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
    if (Number.isNaN(result) || !Number.isFinite(result) || result < 0 || result > 100) {
      absoluteWashoutText = t("absoluteWashoutInvalid")
    } else {
      absoluteWashoutText = t("absoluteWashoutWithValue", { value: result.toFixed(0) })
    }
  }

  let relativeWashoutText = t("relativeWashoutRequirements")
  if (portalVenous !== null && delayed != null) {
    const result = calcRelativeAdrenalWashout(portalVenous, delayed)
    if (Number.isNaN(result) || !Number.isFinite(result) || result < 0 || result > 100) {
      relativeWashoutText = t("relativeWashoutInvalid")
    } else {
      relativeWashoutText = t("relativeWashoutWithValue", { value: result.toFixed(0) })
    }
  }

  const conclusion = t(suggestion)

  return (
    <>
      <Paragraph>
        <Statement>{conclusion}</Statement>
      </Paragraph>
      <Paragraph>
        <List>
          <ListItem>{absoluteWashoutText}</ListItem>
          <ListItem>{relativeWashoutText}</ListItem>
        </List>
      </Paragraph>
    </>
  )
}
