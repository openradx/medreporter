import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { useStructureTranslation } from "../../hooks/useStructureTranslation"
import { selectStructureLanguage, setStructureLanguage } from "../../state/languagesSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { LanguageSelector } from "../common/LanguageSelector"

export const StructureLanguageSelector = () => {
  const { supportedStructuredReportLocales } = useI18nStructuredReport()
  const { i18n: i18nSite } = useSiteTranslation()
  const { i18n: i18nStructure } = useStructureTranslation()

  const currentLanguage = useAppSelector(selectStructureLanguage)

  useSiteLanguageListener((lng) => {
    if (currentLanguage === "as_site") {
      i18nStructure.changeLanguage(lng)
    }
  })

  const dispatch = useAppDispatch()

  const onLanguageChanged = (language: string) => {
    let lng = language
    if (lng === "as_site") {
      lng = i18nSite.language
    }
    i18nStructure.changeLanguage(lng, () => {
      dispatch(setStructureLanguage(language))
    })
  }

  return (
    <LanguageSelector
      ariaLabel="Select structure language"
      currentLocale={currentLanguage}
      supportedLocales={["as_site", ...supportedStructuredReportLocales]}
      onLocaleChanged={onLanguageChanged}
    />
  )
}
