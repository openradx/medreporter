import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { useStructureTranslation } from "../../hooks/useStructureTranslation"
import { selectStructureLanguage, setStructureLanguage } from "../../state/languagesSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { LanguageChooser } from "../common/LanguageChooser"

export const StructureLanguageChooser = () => {
  const { supportedStructuredReportLanguages } = useI18nStructuredReport()
  const { t, i18n: i18nSite } = useSiteTranslation()
  const { i18n: i18nStructure } = useStructureTranslation()

  const currentLanguage = useAppSelector(selectStructureLanguage)

  useSiteLanguageListener((lng) => {
    if (currentLanguage === "asSite") {
      i18nStructure.changeLanguage(lng)
    }
  })

  const dispatch = useAppDispatch()

  const onLanguageChanged = (language: string) => {
    let lng = language
    if (lng === "asSite") {
      lng = i18nSite.language
    }
    i18nStructure.changeLanguage(lng, () => {
      dispatch(setStructureLanguage(language))
    })
  }

  return (
    <LanguageChooser
      actionTitle={t("StructureLanguageChooser.buttonLanguageStructure")}
      currentLanguage={currentLanguage}
      supportedLanguages={["asSite", ...supportedStructuredReportLanguages]}
      onLocaleChanged={onLanguageChanged}
    />
  )
}
