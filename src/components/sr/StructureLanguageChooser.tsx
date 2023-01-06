import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const StructureLanguageChooser = () => {
  const { t } = useSiteTranslation()
  const {
    supportedStructuredReportLanguages,
    currentStructureLanguage,
    setCurrentStructureLanguage,
  } = useStructureTranslation()

  return (
    <LanguageChooser
      actionTitle={t("StructureLanguageChooser.buttonLanguageStructure")}
      currentLanguage={currentStructureLanguage}
      supportedLanguages={["asSite", ...supportedStructuredReportLanguages]}
      onLanguageChanged={setCurrentStructureLanguage}
    />
  )
}
