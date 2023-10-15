import { createOptionalContext } from "~/utils/createOptionalContext"
import { MicroI18n } from "~/utils/microI18n"

export interface MicroI18nTemplateContext {
  i18nStructure: MicroI18n<any>
  i18nReport: MicroI18n<any>
  structureLanguage: string
  reportLanguage: string
  setStructureLanguage: (language: string) => void
  setReportLanguage: (language: string) => void
}

export const [useMicroI18nTemplate, MicroI18nTemplateContextProvider] =
  createOptionalContext<MicroI18nTemplateContext>("MicroI18nTemplateContext")
