import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useReportTranslation } from "../../hooks/useReportTranslation"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectReportLanguage, setReportLanguage } from "../../state/languagesSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { LanguageSelector } from "../common/LanguageSelector"

export const ReportLanguageSelector = () => {
  const { supportedStructuredReportLocales } = useI18nStructuredReport()
  const { t, i18n: i18nSite } = useSiteTranslation()
  const { i18n: i18nReport } = useReportTranslation()

  const currentLanguage = useAppSelector(selectReportLanguage)

  useSiteLanguageListener((lng) => {
    if (currentLanguage === "as_site") {
      i18nReport.changeLanguage(lng)
    }
  })

  const dispatch = useAppDispatch()

  const onLanguageChanged = (language: string) => {
    let lng = language
    if (lng === "as_site") {
      lng = i18nSite.language
    }
    i18nReport.changeLanguage(lng, () => {
      dispatch(setReportLanguage(language))
    })
  }

  return (
    <LanguageSelector
      actionTitle={t("ReportLanguageSelector.button_title_language_report")}
      currentLocale={currentLanguage}
      supportedLocales={["as_site", ...supportedStructuredReportLocales]}
      onLocaleChanged={onLanguageChanged}
    />
  )
}
