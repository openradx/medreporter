import { useEffect } from "react"
import { SiteLanguageOption } from "types"
import { useSiteTranslation } from "./useSiteTranslation"

type Callback = (language: SiteLanguageOption) => void

export const useSiteLanguageListener = (callback: Callback) => {
  const { i18n } = useSiteTranslation()

  useEffect(() => {
    i18n.on("languageChanged", callback)
    return () => {
      i18n.off("languageChanged", callback)
    }
  }, [i18n, callback])
}
