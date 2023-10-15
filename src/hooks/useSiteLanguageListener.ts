import { useEffect } from "react"
import { useSiteTranslation } from "./useSiteTranslation"

type Callback = (language: string) => void

export const useSiteLanguageListener = (callback: Callback) => {
  const { i18n } = useSiteTranslation()

  useEffect(() => {
    i18n.on("languageChanged", callback)
    return () => {
      i18n.off("languageChanged", callback)
    }
  }, [i18n, callback])
}
