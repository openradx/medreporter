import { Resource } from "i18next"
import { GetServerSidePropsContext } from "next"
import { I18nSite } from "~/types/general"
import { createClient } from "./i18nServerClient"

export const getServerSideSiteTranslations = async (
  locale: GetServerSidePropsContext["locale"],
  locales: GetServerSidePropsContext["locales"],
  additionalSiteNamespaces: string[] = []
): Promise<I18nSite> => {
  const initialSiteLanguage = locale!
  const supportedSiteLanguages = locales!
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
    initialSiteLanguage,
    supportedSiteLanguages,
    siteNamespaces,
    siteStore,
  }
}
