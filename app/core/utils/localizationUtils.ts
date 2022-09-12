import DE from "dayjs/locale/de"
import EN_US from "dayjs/locale/en"
import EN_GB from "dayjs/locale/en-gb"
import ES from "dayjs/locale/es"
import FR from "dayjs/locale/fr"
import PT from "dayjs/locale/pt"
import SV from "dayjs/locale/sv"

function getLanguageAndRegionCode(localeCode: string): [string, string | undefined] {
  const match = Array.from(localeCode.trim().matchAll(/^([a-zA-Z]{2})(?:-([a-zA-Z]{2}))?$/g))

  if (!match[0]) {
    throw new Error(`Invalid locale code '${localeCode}'.`)
  }

  return [match[0]?.[1].toLowerCase(), match[0]?.[2]?.toLowerCase()]
}

const codeToLocaleMap: Record<string, ILocale> = {
  de: DE,
  us: EN_US,
  en: EN_GB,
  es: ES,
  fr: FR,
  pt: PT,
  sv: SV,
}

export function getDateLocale(localeCode: string): ILocale {
  const [languageCode, regionCode] = getLanguageAndRegionCode(localeCode)

  if (regionCode && regionCode in codeToLocaleMap) {
    return codeToLocaleMap[regionCode]
  }

  if (languageCode in codeToLocaleMap) {
    return codeToLocaleMap[languageCode]
  }

  throw new Error(`Unsupported locale code '${localeCode}' for date formatting.`)
}

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
const languagesToCountriesMap: Record<string, string> = {
  en: "gb",
  se: "sv",
}

export function getCountryCode(localeCode: string): string {
  const [languageCode, regionCode] = getLanguageAndRegionCode(localeCode)
  let code = regionCode ?? languageCode

  if (code in languagesToCountriesMap) {
    code = languagesToCountriesMap[code]
  }

  return code.toLowerCase()
}
