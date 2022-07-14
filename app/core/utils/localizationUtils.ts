import "dayjs/locale/de"

const supportedDateLocales = ["de", "en-US"]

export const getDateLocale = (locale: string): string => {
  if (!supportedDateLocales.includes(locale)) {
    throw new Error(`Unsupported locale "${locale}".`)
  }
  return locale
}
