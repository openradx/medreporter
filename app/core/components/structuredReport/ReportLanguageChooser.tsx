import { useReportTranslation } from "app/core/hooks/useReportTranslation"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const ReportLanguageChooser = () => {
  const { t } = useSiteTranslation()
  const { supportedStructuredReportLanguages, currentReportLanguage, setCurrentReportLanguage } =
    useReportTranslation()

  return (
    <LanguageChooser
      actionTitle={t("ReportLanguageChooser.buttonLanguageReport")}
      currentLanguage={currentReportLanguage}
      supportedLanguages={["asSite", ...supportedStructuredReportLanguages]}
      onLanguageChanged={setCurrentReportLanguage}
    />
  )
}
