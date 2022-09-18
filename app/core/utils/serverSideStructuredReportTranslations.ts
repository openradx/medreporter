import { Resource } from "i18next"
import { GetStaticPropsContext } from "next"
import { SiteLanguage, StructuredReportLanguage } from "types"
import { I18nStructuredReportProps } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideStructuredReportTranslations = async (
  ctx: GetStaticPropsContext,
  additionalStructuredReportNamespaces: string[] = [],
  supportedLanguages?: StructuredReportLanguage[],
  initialStructureLanguage: StructuredReportLanguage = "asSite",
  initialReportLanguage: StructuredReportLanguage = "asSite"
): Promise<I18nStructuredReportProps> => {
  const currentSiteLanguage = ctx.locale! as SiteLanguage
  const structureLanguage =
    initialStructureLanguage === "asSite" ? currentSiteLanguage : initialStructureLanguage
  const reportLanguage =
    initialReportLanguage === "asSite" ? currentSiteLanguage : initialReportLanguage
  const initialLanguages = Array.from(new Set([structureLanguage, reportLanguage]))

  const supportedSiteLanguages = ctx.locales! as SiteLanguage[]
  const supportedStructuredReportLanguages: StructuredReportLanguage[] =
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
    _i18nStructuredReport: {
      initialStructureLanguage,
      initialReportLanguage,
      supportedStructuredReportLanguages,
      structuredReportNamespaces,
      structuredReportStore,
    },
  }
}
