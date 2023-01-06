import { List } from "~/components/sr/List"
import { ListItem } from "~/components/sr/ListItem"
import { Paragraph } from "~/components/sr/Paragraph"
import { Statement } from "~/components/sr/Statement"
import { useReportData } from "~/contexts/ReportDataContext"
import { useReportTranslation } from "~/hooks/useReportTranslation"
import {
  makeAdrenalMriSuggestion,
  calcAdrenalToSpleenRatio,
  calcSignalDropout,
} from "~/utils/adrenalMriUtils"

type AdrenalMriData = {
  inPhaseAdrenal: number | null
  oppPhaseAdrenal: number | null
  inPhaseSpleen: number | null
  oppPhaseSpleen: number | null
}

export const AdrenalMriReport = () => {
  const { inPhaseAdrenal, oppPhaseAdrenal, inPhaseSpleen, oppPhaseSpleen } = useReportData(
    true
  ) as AdrenalMriData
  const { t } = useReportTranslation()
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
    <>
      <Paragraph>
        <List>
          <ListItem>{signalDropoutText}</ListItem>
          <ListItem>{adrenalToSpleenRatioText}</ListItem>
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
