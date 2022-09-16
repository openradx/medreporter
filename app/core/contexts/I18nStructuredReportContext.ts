import { i18n } from "i18next"
import { createRequiredContext } from "../utils/createRequiredContext"

export interface I18nStructuredReportContext {
  i18nStructure: i18n
  i18nReport: i18n
  supportedStructuredReportLanguages: string[]
}

export const [useI18nStructuredReport, I18nStructuredReportContextProvider] =
  createRequiredContext<I18nStructuredReportContext>("I18nStructuredReportContext")
