import { i18n } from "i18next"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useRef, useState } from "react"
import { I18nSiteContextProvider } from "~/contexts/I18nSiteContext"
import { useOnRouteChange } from "~/hooks/useOnRouteChange"
import { I18nSite, SiteLanguageOption } from "~/types/general"
import { createClient } from "~/utils/i18nBrowserClient"
import { registerInstance } from "~/utils/i18nextReloader"

interface SiteTranslationProviderProps {
  i18nSiteProps: I18nSite
  children: ReactNode
}

export const SiteTranslationProvider = ({
  i18nSiteProps,
  children,
}: SiteTranslationProviderProps) => {
  const [currentSiteLanguage, _setCurrentSiteLanguage] = useState<SiteLanguageOption>(
    i18nSiteProps.initialSiteLanguage!
  )

  const i18nInstance = useRef<{ i18nSite: i18n }>()

  if (!i18nInstance.current) {
    const { initialSiteLanguage, siteNamespaces, siteStore } = i18nSiteProps

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
              pathname: router.pathname as any,
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

  registerInstance("site", i18nInstance.current.i18nSite)

  return (
    <I18nSiteContextProvider
      value={{
        ...i18nInstance.current,
        supportedSiteLanguages: i18nSiteProps.supportedSiteLanguages,
        currentSiteLanguage,
        setCurrentSiteLanguage,
      }}
    >
      {children}
    </I18nSiteContextProvider>
  )
}
