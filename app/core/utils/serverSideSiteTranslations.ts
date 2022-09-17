import { Resource } from "i18next"
import { GetServerSidePropsContext } from "next"
import { SiteLanguage } from "types"
import { I18nSiteProps } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideSiteTranslations = async (
  ctx: GetServerSidePropsContext,
  additionalSiteNamespaces: string[] = []
): Promise<I18nSiteProps> => {
  const initialSiteLanguage = ctx.locale! as SiteLanguage
  const supportedSiteLanguages = ctx.locales! as SiteLanguage[]
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
