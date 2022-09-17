import { Resource } from "i18next"
import { GetStaticPropsContext } from "next"
import { StructuredReportLanguage } from "types"
import { I18nStructuredReportProps } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideStructuredReportTranslations = async (
  ctx: GetStaticPropsContext,
  additionalStructuredReportNamespaces: string[] = []
): Promise<I18nStructuredReportProps> => {
  const initialStructureLanguage = ctx.locale! as StructuredReportLanguage
  const initialReportLanguage = ctx.locale! as StructuredReportLanguage
  const locales = Array.from(new Set([initialStructureLanguage, initialReportLanguage]))
  const supportedStructuredReportLanguages = ctx.locales! as StructuredReportLanguage[]
  const structuredReportNamespaces = [...additionalStructuredReportNamespaces, "structuredReport"]

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
      initialStructureLanguage,
      initialReportLanguage,
      supportedStructuredReportLanguages,
      structuredReportNamespaces,
      structuredReportStore,
    },
  }
}
