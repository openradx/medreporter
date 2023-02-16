import { Resource } from "i18next"
import { GetServerSidePropsContext } from "next"
import {
  I18nStructuredReport,
  SiteLanguageOption,
  StructuredReportLanguageOption,
} from "~/types/general"
import { createClient } from "./i18nServerClient"

export const getServerSideStructuredReportTranslations = async (
  locale: GetServerSidePropsContext["locale"],
  locales: GetServerSidePropsContext["locales"],
  additionalStructuredReportNamespaces: string[] = [],
  supportedLanguages?: StructuredReportLanguageOption[],
  initialStructureLanguage: StructuredReportLanguageOption = "asSite",
  initialReportLanguage: StructuredReportLanguageOption = "asSite"
): Promise<I18nStructuredReport> => {
  const currentSiteLanguage = locale! as SiteLanguageOption
  const structureLanguage =
    initialStructureLanguage === "asSite" ? currentSiteLanguage : initialStructureLanguage
  const reportLanguage =
    initialReportLanguage === "asSite" ? currentSiteLanguage : initialReportLanguage
  const initialLanguages = Array.from(new Set([structureLanguage, reportLanguage]))

  const supportedSiteLanguages = locales! as SiteLanguageOption[]
  const supportedStructuredReportLanguages: StructuredReportLanguageOption[] =
    supportedLanguages === undefined ? supportedSiteLanguages : supportedLanguages

  const structuredReportNamespaces = [...additionalStructuredReportNamespaces, "structuredReport"]

  const { i18n, initPromise } = createClient({
    preload: initialLanguages,
    ns: structuredReportNamespaces,
  })

  await initPromise

  const usedLanguages: Set<string> = new Set()
  for (const language of initialLanguages) {
    // eslint-disable-next-line no-await-in-loop
    await i18n.changeLanguage(language)
    i18n.languages.forEach((lng) => usedLanguages.add(lng))
  }

  const structuredReportStore: Resource = {}
  usedLanguages.forEach((language) => {
    structuredReportStore[language] = {}
    structuredReportNamespaces.forEach((namespace) => {
      structuredReportStore[language][namespace] = i18n.store.data[language]?.[namespace] ?? {}
    })
  })

  return {
    initialStructureLanguage,
    initialReportLanguage,
    supportedStructuredReportLanguages,
    structuredReportNamespaces,
    structuredReportStore,
  }
}
