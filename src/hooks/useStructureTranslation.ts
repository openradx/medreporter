/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation, UseTranslationOptions } from "react-i18next"
import { useI18nStructuredReport } from "~/contexts/I18nStructuredReportContext"

export const useStructureTranslation = (
  ns?: string,
  options?: UseTranslationOptions<undefined>
) => {
  const {
    i18nStructure: i18n,
    i18nReport,
    currentReportLanguage,
    setCurrentReportLanguage,
    ...other
  } = useI18nStructuredReport()
  return { ...useTranslation(ns, { ...options, i18n }), ...other }
}
