import hoistNonReactStatics from "hoist-non-react-statics"
import { i18n } from "i18next"
import { useRouter } from "next/router"
import { ComponentType, useCallback, useRef, useState } from "react"
import { SiteLanguageOption } from "types"
import { I18nSiteContextProvider } from "../contexts/I18nSiteContext"
import { useOnRouteChange } from "../hooks/useOnRouteChange"
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

    const [currentSiteLanguage, _setCurrentSiteLanguage] = useState<SiteLanguageOption>(
      serverData?.initialSiteLanguage!
    )

    const i18nInstance = useRef<{ i18nSite: i18n }>()

    if (serverData && !i18nInstance.current) {
      const { initialSiteLanguage, siteNamespaces, siteStore } = serverData

      const client = createClient({
        lng: initialSiteLanguage,
        ns: siteNamespaces,
        resources: siteStore,
        fallbackNS: siteNamespaces,
      })

      i18nInstance.current = { i18nSite: client.i18n }
    }

    const router = useRouter()

    useOnRouteChange(() => {
      // Reset i18n store on route change so that it can be re-initialized with
      // the language resources for the new page (sent from the server with SSR).
      i18nInstance.current = undefined
    })

    const setCurrentSiteLanguage = useCallback(
      (language: SiteLanguageOption) => {
        i18nInstance.current!.i18nSite.changeLanguage(language, () => {
          if (language !== "cimode") {
            router.push(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                },
              },
              undefined,
              { shallow: true, locale: language }
            )
          }
          _setCurrentSiteLanguage(language)
        })
      },
      [i18nInstance, router]
    )

    if (!serverData || !i18nInstance.current) {
      return <WrappedComponent {...(props as T)} />
    }

    registerInstance("site", i18nInstance.current.i18nSite)

    return (
      <I18nSiteContextProvider
        value={{
          ...i18nInstance.current,
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
