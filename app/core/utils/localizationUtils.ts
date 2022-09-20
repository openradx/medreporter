import DE from "dayjs/locale/de"
import EN_US from "dayjs/locale/en"
import EN_GB from "dayjs/locale/en-gb"
import ES from "dayjs/locale/es"
import FR from "dayjs/locale/fr"
import IT from "dayjs/locale/it"
import NL from "dayjs/locale/nl"
import PT from "dayjs/locale/pt"
import SV from "dayjs/locale/sv"
import { SupportedLanguage } from "types"

const dateLocales: { [language in SupportedLanguage]: ILocale } = {
  other: EN_GB,
  de: DE,
  "en-US": EN_US,
  en: EN_GB,
  es: ES,
  fr: FR,
  it: IT,
  nl: NL,
  pt: PT,
  sv: SV,
}

export function getDateLocale(language: SupportedLanguage): ILocale {
  const dateLocale = dateLocales[language]
  return dateLocale
}
