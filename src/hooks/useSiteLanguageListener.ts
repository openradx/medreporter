import { Locale } from "@lingui/core"
import { useLingui } from "@lingui/react"
import { useEffect } from "react"

type Callback = (language: Locale) => void

export const useSiteLanguageListener = (callback: Callback) => {
  const { i18n } = useLingui()

  useEffect(() => {
    const callCallback = () => {
      callback(i18n.locale)
    }

    i18n.on("change", callCallback)
    return () => {
      i18n.removeListener("change", callCallback)
    }
  }, [i18n, callback])
}
