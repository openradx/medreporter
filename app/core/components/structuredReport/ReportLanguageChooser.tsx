import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useReportTranslation } from "../../hooks/useReportTranslation"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectReportLanguage, setReportLanguage } from "../../state/languagesSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { LanguageChooser } from "../common/LanguageChooser"

export const ReportLanguageChooser = () => {
  const { supportedStructuredReportLanguages } = useI18nStructuredReport()
  const { t, i18n: i18nSite } = useSiteTranslation()
  const { i18n: i18nReport } = useReportTranslation()

  const currentLanguage = useAppSelector(selectReportLanguage)

  useSiteLanguageListener((lng) => {
    if (currentLanguage === "asSite") {
      i18nReport.changeLanguage(lng)
    }
  })

  const dispatch = useAppDispatch()

  const onLanguageChanged = (language: string) => {
    let lng = language
    if (lng === "asSite") {
      lng = i18nSite.language
    }
    i18nReport.changeLanguage(lng, () => {
      dispatch(setReportLanguage(language))
    })
  }

  return (
    <LanguageChooser
      actionTitle={t("ReportLanguageChooser.buttonLanguageReport")}
      currentLocale={currentLanguage}
      supportedLocales={["asSite", ...supportedStructuredReportLanguages]}
      onLocaleChanged={onLanguageChanged}
    />
  )
}
