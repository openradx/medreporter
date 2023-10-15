import { i18n } from "i18next"
import { createRequiredContext } from "~/utils/createRequiredContext"

export interface I18nSiteContext {
  i18nSite: i18n
  supportedSiteLanguages: string[]
  currentSiteLanguage: string
  setCurrentSiteLanguage: (language: string) => void
}

export const [useI18nSite, I18nSiteContextProvider] =
  createRequiredContext<I18nSiteContext>("I18nSiteContext")
