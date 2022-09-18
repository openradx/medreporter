import { i18n } from "i18next"
import { StructuredReportLanguage } from "types"
import { createRequiredContext } from "../utils/createRequiredContext"

export interface I18nStructuredReportContext {
  i18nStructure: i18n
  i18nReport: i18n
  supportedStructuredReportLanguages: StructuredReportLanguage[]
  currentStructureLanguage: StructuredReportLanguage
  currentReportLanguage: StructuredReportLanguage
  setCurrentStructureLanguage: (language: StructuredReportLanguage) => void
  setCurrentReportLanguage: (language: StructuredReportLanguage) => void
}

export const [useI18nStructuredReport, I18nStructuredReportContextProvider] =
  createRequiredContext<I18nStructuredReportContext>("I18nStructuredReportContext")
