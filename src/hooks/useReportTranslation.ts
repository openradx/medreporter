/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation, UseTranslationOptions } from "react-i18next"
import { useI18nStructuredReport } from "~/contexts/I18nStructuredReportContext"

export const useReportTranslation = (ns?: string, options?: UseTranslationOptions<undefined>) => {
  const {
    i18nReport: i18n,
    i18nStructure,
    currentStructureLanguage,
    setCurrentStructureLanguage,
    ...other
  } = useI18nStructuredReport()
  return { ...useTranslation(ns, { ...options, i18n }), ...other }
}
