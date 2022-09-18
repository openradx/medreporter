import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useMemo, useState } from "react"
import { I18nSiteContextProvider } from "../contexts/I18nSiteContext"
import { I18nSiteProps } from "../types"
import { createClient } from "../utils/i18nBrowserClient"
import { registerInstance } from "../utils/i18nextReloader"

interface AppProps {
  pageProps?: Partial<I18nSiteProps>
}

export const withSiteTranslations = <T extends AppProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const WithSiteTranslations = (props: AppProps) => {
    const serverData = props.pageProps?._i18nSite

    const [currentSiteLanguage, setCurrentSiteLanguage] = useState(serverData?.initialSiteLanguage)

    const i18n = useMemo(() => {
      if (!serverData) return null

      const { initialSiteLanguage, siteNamespaces, siteStore } = serverData
      const client = createClient({
        lng: initialSiteLanguage,
        ns: siteNamespaces,
        resources: siteStore,
        fallbackNS: siteNamespaces,
      })
      return client.i18n
    }, [serverData])

    if (!serverData || !currentSiteLanguage || !i18n) {
      return <WrappedComponent {...(props as T)} />
    }

    registerInstance("site", i18n)

    return (
      <I18nSiteContextProvider
        value={{
          i18nSite: i18n,
          supportedSiteLanguages: serverData.supportedSiteLanguages,
          currentSiteLanguage,
          setCurrentSiteLanguage,
        }}
      >
        <WrappedComponent {...(props as T)} />
      </I18nSiteContextProvider>
    )
  }

  return hoistNonReactStatics(WithSiteTranslations, WrappedComponent)
}
