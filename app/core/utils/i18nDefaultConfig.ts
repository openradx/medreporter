import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { InitOptions } from "i18next"
import { getDateLocale } from "./localizationUtils"

dayjs.extend(relativeTime)

export const defaultConfig: InitOptions = {
  debug: false,
  fallbackLng: "en",
  partialBundledLanguages: true,
  saveMissing: true,
  returnNull: false,
  missingKeyHandler: (lngs, ns, key) => {
    // eslint-disable-next-line no-console
    console.error(
      `Missing translation key '${key}' of language(s)` +
        ` '${lngs.join(", ")}' in namespace '${ns}'.`
    )
  },
  interpolation: {
    escapeValue: false,
    format: (value, format, lng) => {
      if (value instanceof Date) {
        const locale = getDateLocale(lng! as any)
        const formatter = dayjs(value).locale(locale)
        if (format === "long") return formatter.format("LLLL")
        if (format === "ago") return formatter.fromNow()
        return formatter.format("L")
      }
      if (format === "uppercase") return value.toUpperCase()
      if (format === "capitalize") return value.charAt(0).toUpperCase() + value.slice(1)
      return value
    },
  },
}
