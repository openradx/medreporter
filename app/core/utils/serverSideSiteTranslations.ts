import { Resource } from "i18next"
import { GetServerSidePropsContext } from "next"
import { I18nSiteProps } from "../types"
import { createClient } from "./i18nServerClient"

export const serverSideSiteTranslations = async (
  ctx: GetServerSidePropsContext,
  additionalSiteNamespaces: string[] = []
): Promise<I18nSiteProps> => {
  const initialSiteLocale = ctx.locale!
  const supportedSiteLocales = ctx.locales!
  const siteNamespaces = [...additionalSiteNamespaces, "common"]

  const { i18n, initPromise } = createClient({
    lng: initialSiteLocale,
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
      initialSiteLocale,
      supportedSiteLocales,
      siteNamespaces,
      siteStore,
    },
  }
}
