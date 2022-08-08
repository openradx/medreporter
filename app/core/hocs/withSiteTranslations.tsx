import hoistNonReactStatics from "hoist-non-react-statics"
import { i18n } from "i18next"
import { ComponentType, useMemo } from "react"
import { I18nSiteContextProvider } from "../contexts/I18nSiteContext"
import { I18nSiteProps } from "../types"
import { createClient } from "../utils/i18nBrowserClient"

let i18nextHmrInitialized = false
const setupI18nextHmr = async (i18nInstance: i18n) => {
  if (!i18nextHmrInitialized && process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
      const { applyClientHMR } = await import("i18next-hmr/client")
      applyClientHMR(i18nInstance)
    } else {
      const { applyServerHMR } = await import("i18next-hmr/server")
      applyServerHMR(i18nInstance)
    }
    i18nextHmrInitialized = true
  }
}

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

    setupI18nextHmr(i18nInstance!)

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
