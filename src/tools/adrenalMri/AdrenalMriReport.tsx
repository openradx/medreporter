import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import {
  calcAdrenalToSpleenRatio,
  calcSignalDropout,
  makeAdrenalMriSuggestion,
} from "./adrenalMriUtils"
import { i18nReport } from "./locales"

type AdrenalMriData = {
  inPhaseAdrenal: number | null
  oppPhaseAdrenal: number | null
  inPhaseSpleen: number | null
  oppPhaseSpleen: number | null
}

export const AdrenalMriReport = () => {
  const { inPhaseAdrenal, oppPhaseAdrenal, inPhaseSpleen, oppPhaseSpleen } =
    useStructureData() as AdrenalMriData
  const { t } = useMicroTranslation(i18nReport)

  let signalDropoutText = t("AdrenalMri.textSignalDropoutRequirements")
  if (inPhaseAdrenal !== null && oppPhaseAdrenal !== null) {
    const result = calcSignalDropout(inPhaseAdrenal, oppPhaseAdrenal)
    if (Number.isNaN(result) || !Number.isFinite(result)) {
      signalDropoutText = "invalid"
    } else {
      signalDropoutText = t("AdrenalMri.textSignalDropoutWithValue", {
        value: result.toFixed(2),
      })
    }
  }

  let adrenalToSpleenRatioText = t("AdrenalMri.textAdrenalToSpleenRatioRequirements")
  if (
    inPhaseAdrenal !== null &&
    oppPhaseAdrenal !== null &&
    inPhaseSpleen !== null &&
    oppPhaseSpleen !== null
  ) {
    const result = calcAdrenalToSpleenRatio(
      inPhaseAdrenal,
      oppPhaseAdrenal,
      inPhaseSpleen,
      oppPhaseSpleen
    )
    if (Number.isNaN(result) || !Number.isFinite(result)) {
      adrenalToSpleenRatioText = "invalid"
    } else {
      adrenalToSpleenRatioText = t("AdrenalMri.textAdrenalToSpleenRatioWithValue", {
        value: result.toFixed(2),
      })
    }
  }

  const suggestions = makeAdrenalMriSuggestion(
    inPhaseAdrenal,
    oppPhaseAdrenal,
    inPhaseSpleen,
    oppPhaseSpleen
  )

  return (
    <Report>
      <Paragraph>
        <Statement>{signalDropoutText}</Statement>
        <Statement>{adrenalToSpleenRatioText}</Statement>
      </Paragraph>
      <Paragraph>
        {suggestions.map((suggestion) => (
          <Statement key={suggestion}>{t(suggestion)}</Statement>
        ))}
      </Paragraph>
    </Report>
  )
}
