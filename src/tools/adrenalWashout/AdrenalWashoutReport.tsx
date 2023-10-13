import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useReportTranslation } from "~/hooks/useReportTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import {
  calcAbsoluteAdrenalWashout,
  calcRelativeAdrenalWashout,
  makeAdrenalWashoutSuggestion,
} from "./adrenalWashoutUtils"

type AdrenalWashoutData = {
  nonEnhanced: number | null
  portalVenous: number | null
  delayed: number | null
}

export const AdrenalWashoutReport = () => {
  const { nonEnhanced, portalVenous, delayed } = useStructureData() as AdrenalWashoutData
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
    <Report>
      <Paragraph>
        <Statement>{absoluteWashoutText}</Statement>
        <Statement>{relativeWashoutText}</Statement>
      </Paragraph>
      <Paragraph>
        {suggestions.map((suggestion) => (
          <Statement key={suggestion}>{t(suggestion)}</Statement>
        ))}
      </Paragraph>
    </Report>
  )
}
