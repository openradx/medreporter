import { Resource } from "i18next"
import { I18nStructuredReportProps } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideStructuredReportTranslations = async (
  initialStructureLocale: string,
  initialReportLocale: string,
  supportedStructuredReportLocales: string[],
  additionalStructuredReportNamespaces: string[] = []
): Promise<I18nStructuredReportProps> => {
  const locales = Array.from(new Set([initialStructureLocale, initialReportLocale]))
  const structuredReportNamespaces = ["structuredReport", ...additionalStructuredReportNamespaces]

  const { i18n, initPromise } = createClient({
    preload: locales,
    ns: structuredReportNamespaces,
  })

  await initPromise

  const languages: Set<string> = new Set()
  for (const locale of locales) {
    // eslint-disable-next-line no-await-in-loop
    await i18n.changeLanguage(locale)
    for (const lng of i18n.languages) {
      languages.add(lng)
    }
  }

  const structuredReportStore: Resource = {}
  languages.forEach((language) => {
    structuredReportStore[language] = {}
    structuredReportNamespaces.forEach((namespace) => {
      structuredReportStore[language][namespace] = i18n.store.data[language]?.[namespace] ?? {}
    })
  })

  return {
    _i18nStructuredReport: {
      initialStructureLocale,
      initialReportLocale,
      supportedStructuredReportLocales,
      structuredReportNamespaces,
      structuredReportStore,
    },
  }
}
