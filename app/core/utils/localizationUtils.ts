import "dayjs/locale/de"

const supportedDateLocales = ["de", "en"]

export function getDateLocale(locale: string): string {
  if (!supportedDateLocales.includes(locale)) {
    throw new Error(`Unsupported locale "${locale}".`)
  }
  return locale
}

export function getCountryCode(languageCode: string): string {
  const match = Array.from(languageCode.trim().matchAll(/^([a-zA-Z]{2})(?:-([a-zA-Z]{2}))?$/g))
  let countryCode: string = match[0]?.[2] ?? match[0]?.[1] ?? ""

  if (!countryCode) {
    throw new Error(`Invalid locale code '${languageCode}'.`)
  }

  if (countryCode === "en") {
    countryCode = "gb"
  }

  return countryCode.toLowerCase()
}
