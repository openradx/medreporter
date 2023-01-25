import { i18n } from "i18next"
import { ReactNode, useCallback, useRef, useState } from "react"
import { I18nStructuredReportContextProvider } from "~/contexts/I18nStructuredReportContext"
import { useOnRouteChange } from "~/hooks/useOnRouteChange"
import { useSiteLanguageListener } from "~/hooks/useSiteLanguageListener"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { I18nStructuredReport, StructuredReportLanguageOption } from "~/types/general"
import { createClient } from "~/utils/i18nBrowserClient"
import { registerInstance } from "~/utils/i18nextReloader"

interface StructuredReportTranslationProviderProps {
  i18nStructuredReportProps: I18nStructuredReport
  children: ReactNode
}

export const StructuredReportTranslationProvider = ({
  i18nStructuredReportProps,
  children,
}: StructuredReportTranslationProviderProps) => {
  const [_currentStructureLanguage, _setCurrentStructureLanguage] =
    useState<StructuredReportLanguageOption>()

  const currentStructureLanguage =
    _currentStructureLanguage ?? i18nStructuredReportProps.initialStructureLanguage ?? "asSite"

  const [_currentReportLanguage, _setCurrentReportLanguage] =
    useState<StructuredReportLanguageOption>()

  const currentReportLanguage =
    _currentReportLanguage ?? i18nStructuredReportProps.initialReportLanguage ?? "asSite"

  const { currentSiteLanguage } = useSiteTranslation()

  const i18nInstances = useRef<{ i18nStructure: i18n; i18nReport: i18n }>()

  if (!i18nInstances.current) {
    const {
      initialStructureLanguage,
      initialReportLanguage,
      structuredReportNamespaces,
      structuredReportStore,
    } = i18nStructuredReportProps

    const structureLanguage =
      initialStructureLanguage === "asSite" ? currentSiteLanguage : initialStructureLanguage

    const client = createClient({
      lng: structureLanguage,
      ns: structuredReportNamespaces,
      resources: structuredReportStore,
      fallbackNS: structuredReportNamespaces,
    })

    const i18nStructure = client.i18n

    const reportLanguage =
      initialReportLanguage === "asSite" ? currentSiteLanguage : initialReportLanguage

    const i18nReport = client.i18n.cloneInstance({
      lng: reportLanguage,
    })

    i18nInstances.current = { i18nStructure, i18nReport }
  }

  useOnRouteChange(() => {
    // Reset i18n stores on route change so that they can be re-initialized with
    // the language resources for the new page (sent from the server with SSR).
    i18nInstances.current = undefined

    // Also reset currently chosen structure and report language
    _setCurrentReportLanguage(undefined)
    _setCurrentStructureLanguage(undefined)
  })

  const setCurrentStructureLanguage = useCallback(
    (language: StructuredReportLanguageOption) => {
      i18nInstances.current!.i18nStructure.changeLanguage(
        language === "asSite" ? currentSiteLanguage : language,
        () => {
          _setCurrentStructureLanguage(language)
        }
      )
    },
    [i18nInstances, currentSiteLanguage]
  )

  const setCurrentReportLanguage = useCallback(
    (language: StructuredReportLanguageOption) => {
      i18nInstances.current!.i18nReport.changeLanguage(
        language === "asSite" ? currentSiteLanguage : language,
        () => {
          _setCurrentReportLanguage(language)
        }
      )
    },
    [i18nInstances, currentSiteLanguage]
  )

  useSiteLanguageListener((language) => {
    if (currentStructureLanguage === "asSite") {
      i18nInstances.current?.i18nStructure.changeLanguage(language)
    }
    if (currentReportLanguage === "asSite") {
      i18nInstances.current?.i18nReport.changeLanguage(language)
    }
  })

  registerInstance("structure", i18nInstances.current.i18nStructure)
  registerInstance("report", i18nInstances.current.i18nReport)

  return (
    <I18nStructuredReportContextProvider
      value={{
        ...i18nInstances.current,
        supportedStructuredReportLanguages:
          i18nStructuredReportProps.supportedStructuredReportLanguages,
        currentStructureLanguage,
        currentReportLanguage,
        setCurrentStructureLanguage,
        setCurrentReportLanguage,
      }}
    >
      {children}
    </I18nStructuredReportContextProvider>
  )
}
