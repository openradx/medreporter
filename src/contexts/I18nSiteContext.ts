import { i18n } from "i18next"
import { SiteLanguageOption } from "~/types/general"
import { createRequiredContext } from "~/utils/createRequiredContext"

export interface I18nSiteContext {
  i18nSite: i18n
  supportedSiteLanguages: SiteLanguageOption[]
  currentSiteLanguage: SiteLanguageOption
  setCurrentSiteLanguage: (language: SiteLanguageOption) => void
}

export const [useI18nSite, I18nSiteContextProvider] =
  createRequiredContext<I18nSiteContext>("I18nSiteContext")
