import { Locale } from "@lingui/core"
import { createRequiredContext } from "~/utils/createRequiredContext"

export interface ChangeLanguageContext {
  changeLanguage: (language: Locale) => void
}

export const [useChangeLanguage, ChangeLanguageContextProvider] =
  createRequiredContext<ChangeLanguageContext>("ChangeLanguageContext")
