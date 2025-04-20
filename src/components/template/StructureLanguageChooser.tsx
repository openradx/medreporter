import { useLingui } from "@lingui/react/macro"
import { useMicroI18nTemplate } from "~/contexts/MicroI18nTemplateContext"
import { LanguageChooser } from "../common/LanguageChooser"

export const StructureLanguageChooser = () => {
  const { t } = useLingui()
  const i18nTemplate = useMicroI18nTemplate()
  if (!i18nTemplate) return null

  const { i18nStructure, structureLanguage, setStructureLanguage } = i18nTemplate

  return (
    <LanguageChooser
      actionTitle={t`Structure language`}
      currentLanguage={structureLanguage}
      supportedLanguages={["asSite", ...(i18nStructure.supportedLanguages as string[])]}
      onLanguageChanged={setStructureLanguage}
    />
  )
}
