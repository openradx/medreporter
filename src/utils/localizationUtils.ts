import DE from "dayjs/locale/de"
import EN_GB from "dayjs/locale/en-gb"

const dateLocales: { [language: string]: ILocale } = {
  de: DE,
  en: EN_GB,
}

export function getDateLocale(language: string): ILocale {
  const dateLocale = dateLocales[language]
  if (!dateLocale) {
    throw new Error(`Missing date locale for language: ${language}`)
  }
  return dateLocale
}
