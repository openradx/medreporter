import hoistNonReactStatics from "hoist-non-react-statics"
import { i18n } from "i18next"
import { useCallback, useRef, useState } from "react"
import { StructuredReportLanguage } from "types"
import { I18nStructuredReportContextProvider } from "../contexts/I18nStructuredReportContext"
import { useSiteLanguageListener } from "../hooks/useSiteLanguageListener"
import { useSiteTranslation } from "../hooks/useSiteTranslation"
import { I18nStructuredReportProps } from "../types"
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

    const [currentStructureLanguage, _setCurrentStructureLanguage] =
      useState<StructuredReportLanguage>(serverData?.initialStructureLanguage!)

    const [currentReportLanguage, _setCurrentReportLanguage] = useState<StructuredReportLanguage>(
      serverData?.initialReportLanguage!
    )

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

    const setCurrentStructureLanguage = useCallback(
      (language: StructuredReportLanguage) => {
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
      (language: StructuredReportLanguage) => {
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
