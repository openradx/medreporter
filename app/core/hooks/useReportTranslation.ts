import { useTranslation } from "react-i18next"
import { useI18nStructuredReport } from "../contexts/I18nStructuredReportContext"

export const useReportTranslation: typeof useTranslation = (ns, options) => {
  const i18n = useI18nStructuredReport().i18nReport
  return useTranslation(ns, { ...options, i18n })
}
