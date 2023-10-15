import { useEffect, useReducer, useState } from "react"
import { MicroI18n, Resources } from "~/utils/microI18n"

export const useMicroTranslation = <T extends Resources>(i18n: MicroI18n<T>) => {
  // Force a re-render (when an option was changed)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  // Re-render when the language changes
  const [, setCurrentLng] = useState<keyof T>(i18n.currentLanguage)

  useEffect(() => {
    const optionsChangedHandler = () => forceUpdate()
    i18n.on("optionsChanged", optionsChangedHandler)
    const languageChangedHandler = (i18nLng: keyof T) => setCurrentLng(i18nLng)
    i18n.on("languageChanged", languageChangedHandler)
    return () => {
      i18n.off("optionsChanged", optionsChangedHandler)
      i18n.off("languageChanged", languageChangedHandler)
    }
  }, [i18n])

  return {
    t: i18n.t.bind(i18n),
    changeLanguage: i18n.changeLanguage.bind(i18n),
    currentLanguage: i18n.currentLanguage,
    supportedLanguages: i18n.supportedLanguages,
  }
}
