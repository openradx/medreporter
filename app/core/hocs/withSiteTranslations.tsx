import hoistNonReactStatics from "hoist-non-react-statics"
import { i18n } from "i18next"
import { useRouter } from "next/router"
import { ComponentType, useCallback, useEffect, useRef, useState } from "react"
import { SiteLanguage } from "types"
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

    const [currentSiteLanguage, _setCurrentSiteLanguage] = useState<SiteLanguage>(
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

    // Quite ugly workaround as on a non shallow route change this component will be just
    // rerendered with the existing i18n store and without the new language resources
    // sent by the server. So we have to destroy the store explicitly then.
    // But we don't want to destroy it on shallow render as we use this during
    // just a language change, where we load the resources using the API by
    // calling `changeLanguage` on the store before the shallow route change (see below).
    useEffect(() => {
      const handleStart = (_url: string, { shallow }: { shallow: boolean }) => {
        if (!shallow) {
          // reset i18n store that it can be rebuilt on new page
          i18nInstance.current = undefined
        }
      }

      router.events.on("routeChangeStart", handleStart)

      return () => {
        router.events.off("routeChangeStart", handleStart)
      }
    }, [router])

    const setCurrentSiteLanguage = useCallback(
      (language: SiteLanguage) => {
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
