import { useMicroI18nTemplate } from "~/contexts/MicroI18nTemplateContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const StructureLanguageChooser = () => {
  const { t } = useSiteTranslation()
  const i18nTemplate = useMicroI18nTemplate()
  if (!i18nTemplate) return null

  const { i18nStructure, structureLanguage, setStructureLanguage } = i18nTemplate

  return (
    <LanguageChooser
      actionTitle={t("StructureLanguageChooser.buttonLanguageStructure")}
      currentLanguage={structureLanguage}
      supportedLanguages={["asSite", ...(i18nStructure.supportedLanguages as string[])]}
      onLanguageChanged={setStructureLanguage}
    />
  )
}
