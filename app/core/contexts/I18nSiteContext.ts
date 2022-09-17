import { i18n } from "i18next"
import { SiteLanguage } from "types"
import { createRequiredContext } from "../utils/createRequiredContext"

export interface I18nSiteContext {
  i18nSite: i18n
  supportedSiteLanguages: SiteLanguage[]
  currentSiteLanguage: SiteLanguage
}

export const [useI18nSite, I18nSiteContextProvider] =
  createRequiredContext<I18nSiteContext>("I18nSiteContext")
