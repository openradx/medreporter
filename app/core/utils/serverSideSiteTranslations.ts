import { Resource } from "i18next"
import { GetServerSidePropsContext } from "next"
import { I18nSiteProps, SiteLanguageOption } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideSiteTranslations = async (
  ctx: GetServerSidePropsContext,
  additionalSiteNamespaces: string[] = []
): Promise<I18nSiteProps> => {
  const initialSiteLanguage = ctx.locale! as SiteLanguageOption
  const supportedSiteLanguages = ctx.locales! as SiteLanguageOption[]
  const siteNamespaces = [...additionalSiteNamespaces, "common"]

  const { i18n, initPromise } = createClient({
    lng: initialSiteLanguage,
    ns: siteNamespaces,
  })

  await initPromise

  const siteStore: Resource = {}
  i18n.languages.forEach((language) => {
    siteStore[language] = {}
    siteNamespaces.forEach((namespace) => {
      siteStore[language][namespace] = i18n.store.data[language]?.[namespace] ?? {}
    })
  })

  return {
    _i18nSite: {
      initialSiteLanguage,
      supportedSiteLanguages,
      siteNamespaces,
      siteStore,
    },
  }
}
