import { StructuredReportLanguage } from "types"
import { useI18nSite } from "app/core/contexts/I18nSiteContext"
import { useI18nStructuredReport } from "../../contexts/I18nStructuredReportContext"
import { useSiteLanguageListener } from "../../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { useStructureTranslation } from "../../hooks/useStructureTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const StructureLanguageChooser = () => {
  const {
    supportedStructuredReportLanguages,
    currentStructureLanguage,
    setCurrentStructureLanguage,
  } = useI18nStructuredReport()
  const { currentSiteLanguage } = useI18nSite()
  const { i18n: i18nStructure } = useStructureTranslation()
  const { t } = useSiteTranslation()

  useSiteLanguageListener((language) => {
    if (currentStructureLanguage === "asSite") {
      i18nStructure.changeLanguage(language)
    }
  })

  const onLanguageChanged = (language: StructuredReportLanguage) => {
    i18nStructure.changeLanguage(language === "asSite" ? currentSiteLanguage : language, () => {
      setCurrentStructureLanguage(language)
    })
  }

  return (
    <LanguageChooser
      actionTitle={t("StructureLanguageChooser.buttonLanguageStructure")}
      currentLanguage={currentStructureLanguage}
      supportedLanguages={["asSite", ...supportedStructuredReportLanguages]}
      onLanguageChanged={onLanguageChanged}
    />
  )
}
