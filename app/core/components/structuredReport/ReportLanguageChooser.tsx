import { StructuredReportLanguage } from "types"
import { useI18nSite } from "app/core/contexts/I18nSiteContext"
import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useReportTranslation } from "../../hooks/useReportTranslation"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const ReportLanguageChooser = () => {
  const { supportedStructuredReportLanguages, currentReportLanguage, setCurrentReportLanguage } =
    useI18nStructuredReport()
  const { currentSiteLanguage } = useI18nSite()
  const { i18n: i18nReport } = useReportTranslation()
  const { t } = useSiteTranslation()

  useSiteLanguageListener((language) => {
    if (currentReportLanguage === "asSite") {
      i18nReport.changeLanguage(language)
    }
  })

  const onLanguageChanged = (language: StructuredReportLanguage) => {
    i18nReport.changeLanguage(language === "asSite" ? currentSiteLanguage : language, () => {
      setCurrentReportLanguage(language)
    })
  }

  return (
    <LanguageChooser
      actionTitle={t("ReportLanguageChooser.buttonLanguageReport")}
      currentLanguage={currentReportLanguage}
      supportedLanguages={["asSite", ...supportedStructuredReportLanguages]}
      onLanguageChanged={onLanguageChanged}
    />
  )
}
