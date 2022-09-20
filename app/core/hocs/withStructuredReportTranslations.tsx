import hoistNonReactStatics from "hoist-non-react-statics"
import { i18n } from "i18next"
import { useCallback, useRef, useState } from "react"
import { I18nStructuredReportContextProvider } from "../contexts/I18nStructuredReportContext"
import { useOnRouteChange } from "../hooks/useOnRouteChange"
import { useSiteLanguageListener } from "../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../hooks/useSiteTranslation"
import { I18nStructuredReportProps, StructuredReportLanguageOption } from "../types"
import { createClient } from "../utils/i18nBrowserClient"
import { registerInstance } from "../utils/i18nextReloader"

interface AppProps {
  pageProps?: Partial<I18nStructuredReportProps>
}

export const withStructuredReportTranslations = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> => {
  const WithStructuredReportTranslations = (props: AppProps) => {
    const serverData = props.pageProps?._i18nStructuredReport

    const [_currentStructureLanguage, _setCurrentStructureLanguage] =
      useState<StructuredReportLanguageOption>()

    const currentStructureLanguage =
      _currentStructureLanguage ?? serverData?.initialStructureLanguage ?? "asSite"

    const [_currentReportLanguage, _setCurrentReportLanguage] =
      useState<StructuredReportLanguageOption>()

    const currentReportLanguage =
      _currentReportLanguage ?? serverData?.initialReportLanguage ?? "asSite"

    const { currentSiteLanguage } = useSiteTranslation()

    const i18nInstances = useRef<{ i18nStructure: i18n; i18nReport: i18n }>()

    if (serverData && !i18nInstances.current) {
      const {
        initialStructureLanguage,
        initialReportLanguage,
        structuredReportNamespaces,
        structuredReportStore,
      } = serverData

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

    if (!serverData || !i18nInstances.current) {
      return <WrappedComponent {...(props as T)} />
    }

    registerInstance("structure", i18nInstances.current.i18nStructure)
    registerInstance("report", i18nInstances.current.i18nReport)

    return (
      <I18nStructuredReportContextProvider
        value={{
          ...i18nInstances.current,
          supportedStructuredReportLanguages: serverData.supportedStructuredReportLanguages,
          currentStructureLanguage,
          currentReportLanguage,
          setCurrentStructureLanguage,
          setCurrentReportLanguage,
        }}
      >
        <WrappedComponent {...(props as T)} />
      </I18nStructuredReportContextProvider>
    )
  }

  return hoistNonReactStatics(WithStructuredReportTranslations, WrappedComponent)
}
