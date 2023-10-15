import { ReactNode, useCallback, useRef, useState } from "react"
import { MicroI18nTemplateContextProvider } from "~/contexts/MicroI18nTemplateContext"
import { useSiteLanguageListener } from "~/hooks/useSiteLanguageListener"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MicroI18n } from "~/utils/microI18n"

type TemplateLanguage = string | "asSite" | "cimode"

interface TemplateTranslationProviderProps {
  i18nStructure: MicroI18n<any>
  i18nReport: MicroI18n<any>
  children: ReactNode
}

export const TemplateTranslationProvider = ({
  i18nStructure,
  i18nReport,
  children,
}: TemplateTranslationProviderProps) => {
  const [structureLanguage, _setStructureLanguage] = useState<TemplateLanguage>("asSite")
  const [reportLanguage, _setReportLanguage] = useState<TemplateLanguage>("asSite")

  const { currentSiteLanguage } = useSiteTranslation()

  const setStructureLanguage = useCallback(
    (language: TemplateLanguage) => {
      i18nStructure.options = { debugKeys: language === "cimode" }
      i18nStructure.changeLanguage(language === "asSite" ? currentSiteLanguage : language)
      _setStructureLanguage(language)
    },
    [i18nStructure, currentSiteLanguage]
  )

  const setReportLanguage = useCallback(
    (language: TemplateLanguage) => {
      i18nReport.options = { debugKeys: language === "cimode" }
      i18nReport.changeLanguage(language === "asSite" ? currentSiteLanguage : language)
      _setReportLanguage(language)
    },
    [i18nReport, currentSiteLanguage]
  )

  useSiteLanguageListener((language) => {
    if (structureLanguage === "asSite") {
      i18nStructure.changeLanguage(language)
    }
    if (reportLanguage === "asSite") {
      i18nReport.changeLanguage(language)
    }
  })

  const initialized = useRef(false)
  if (!initialized.current) {
    if (structureLanguage === "asSite") {
      i18nStructure.changeLanguage(currentSiteLanguage)
    }
    if (reportLanguage === "asSite") {
      i18nReport.changeLanguage(currentSiteLanguage)
    }
    initialized.current = true
  }

  return (
    <MicroI18nTemplateContextProvider
      value={{
        i18nStructure,
        i18nReport,
        structureLanguage,
        reportLanguage,
        setStructureLanguage,
        setReportLanguage,
      }}
    >
      {children}
    </MicroI18nTemplateContextProvider>
  )
}
