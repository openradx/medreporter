import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useMemo } from "react"
import { I18nSiteContextProvider } from "../contexts/I18nSiteContext"
import { I18nSiteProps } from "../types"
import { createClient } from "../utils/i18nBrowserClient"
import { setupI18nextHmr } from "../utils/setupI18nextHmr"

interface AppProps {
  pageProps?: Partial<I18nSiteProps>
}

export const withSiteTranslations = <T extends AppProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const WithSiteTranslations = (props: AppProps) => {
    const serverData = props.pageProps?._i18nSite

    const i18nInstance = useMemo(() => {
      if (!serverData) return null

      const { initialSiteLocale, siteNamespaces, siteStore } = serverData
      const client = createClient({
        lng: initialSiteLocale,
        ns: siteNamespaces,
        resources: siteStore,
        fallbackNS: siteNamespaces,
      })
      return client.i18n
    }, [serverData])

    if (i18nInstance) {
      setupI18nextHmr(i18nInstance)
    }

    if (!serverData || !i18nInstance) {
      return <WrappedComponent {...(props as T)} />
    }

    return (
      <I18nSiteContextProvider
        value={{ i18nSite: i18nInstance, supportedSiteLocales: serverData.supportedSiteLocales }}
      >
        <WrappedComponent {...(props as T)} />
      </I18nSiteContextProvider>
    )
  }

  return hoistNonReactStatics(WithSiteTranslations, WrappedComponent)
}
