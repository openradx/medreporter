import hoistNonReactStatics from "hoist-non-react-statics"
import { useMemo } from "react"
import { I18nStructuredReportContextProvider } from "../contexts/I18nStructuredReportContext"
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

    const i18nInstances = useMemo(() => {
      if (!serverData) return null

      const {
        initialStructureLocale,
        initialReportLocale,
        structuredReportNamespaces,
        structuredReportStore,
      } = serverData

      const client = createClient({
        lng: initialStructureLocale,
        ns: structuredReportNamespaces,
        resources: structuredReportStore,
        fallbackNS: structuredReportNamespaces,
      })

      const i18nStructure = client.i18n

      const i18nReport = client.i18n.cloneInstance({
        lng: initialReportLocale,
      })

      return {
        i18nStructure,
        i18nReport,
      }
    }, [serverData])

    if (!serverData || !i18nInstances) {
      return <WrappedComponent {...(props as T)} />
    }

    registerInstance("structure", i18nInstances.i18nStructure)
    registerInstance("report", i18nInstances.i18nReport)

    return (
      <I18nStructuredReportContextProvider
        value={{
          ...i18nInstances,
          supportedStructuredReportLocales: serverData.supportedStructuredReportLocales,
        }}
      >
        <WrappedComponent {...(props as T)} />
      </I18nStructuredReportContextProvider>
    )
  }

  return hoistNonReactStatics(WithStructuredReportTranslations, WrappedComponent)
}
