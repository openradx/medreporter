import { Statement } from "app/core/components/structuredReport/Statement"
import { useReportTranslation } from "app/core/hooks/useReportTranslation"
import { List } from "../../../core/components/structuredReport/List"
import { ListItem } from "../../../core/components/structuredReport/ListItem"
import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { useReportData } from "../../../core/contexts/ReportDataContext"
import {
  makeAdrenalMriSuggestion,
  calcAdrenalToSpleenRatio,
  calcSignalDropout,
} from "../utils/adrenalMriUtils"

type AdrenalMriData = {
  inPhaseAdrenal: number | null
  oppPhaseAdrenal: number | null
  inPhaseSpleen: number | null
  oppPhaseSpleen: number | null
}

export const AdrenalMriReport = () => {
  const reportData = useReportData(true)
  console.log(reportData)
  const { inPhaseAdrenal, oppPhaseAdrenal, inPhaseSpleen, oppPhaseSpleen } = useReportData(
    true
  ) as AdrenalMriData
  const { t } = useReportTranslation()
  let signalDropoutText = t("AdrenalMri.textSignalDropoutRequirements")
  if (inPhaseAdrenal !== null && oppPhaseAdrenal !== null) {
    signalDropoutText = calcSignalDropout(inPhaseAdrenal, oppPhaseAdrenal).toString()
  }

  let adrenalToSpleenRatioText = t("AdrenalMri.textAdrenalToSpleenRatioRequirements")
  if (
    inPhaseAdrenal !== null &&
    oppPhaseAdrenal !== null &&
    inPhaseSpleen !== null &&
    oppPhaseSpleen !== null
  ) {
    adrenalToSpleenRatioText = calcAdrenalToSpleenRatio(
      inPhaseAdrenal,
      oppPhaseAdrenal,
      inPhaseSpleen,
      oppPhaseSpleen
    ).toString()
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
