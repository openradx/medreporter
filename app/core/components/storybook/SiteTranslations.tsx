import { ReactNode, Suspense, useMemo } from "react"
import { I18nSiteContextProvider } from "../../contexts/I18nSiteContext"
import { SiteLanguageOption } from "../../types"
import { createClient } from "../../utils/i18nStorybookClient"

const DEFAULT_ADDITIONAL_NAMESPACES: string[] = []

interface SiteTranslationsProps {
  language?: SiteLanguageOption
  additionalNamespaces?: string[]
  children: ReactNode
}

export const SiteTranslations = ({
  language = "en",
  additionalNamespaces = DEFAULT_ADDITIONAL_NAMESPACES,
  children,
}: SiteTranslationsProps) => {
  const i18n = useMemo(() => {
    const namespaces = [...additionalNamespaces, "common"]

    const client = createClient({
      lng: language,
      ns: namespaces,
      fallbackNS: namespaces,
    })
    return client.i18n
  }, [additionalNamespaces, language])

  return (
    <Suspense fallback="Loading translations ...">
      <I18nSiteContextProvider
        value={{
          i18nSite: i18n,
          supportedSiteLanguages: [language],
          currentSiteLanguage: language,
          setCurrentSiteLanguage: () => {},
        }}
      >
        {children}
      </I18nSiteContextProvider>
    </Suspense>
  )
}
