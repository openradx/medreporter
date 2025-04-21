import { Locale as LngLocale, Messages, setupI18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { useRouter } from "next/router"
import { Locale } from "nextjs-routes"
import { ReactNode, useCallback, useState } from "react"
import { ChangeLanguageContextProvider } from "~/contexts/ChangeLanguageContext"
import { loadSiteTranslation } from "~/utils/i18n"

interface SiteTranslationProviderProps {
  translation: Messages
  children: ReactNode
}

export const SiteTranslationProvider = ({
  translation,
  children,
}: SiteTranslationProviderProps) => {
  const router = useRouter()

  const [i18n] = useState(() => {
    const locale = router.locale
    const i18n = setupI18n({ locale: locale, messages: { [locale]: translation } })
    return i18n
  })

  const activateLocale = useCallback(
    async (locale: string) => {
      const messages = await loadSiteTranslation(locale)
      i18n.loadAndActivate({ locale, messages })
    },
    [i18n]
  )

  const changeLanguage = useCallback(
    (language: LngLocale) => {
      activateLocale(language)

      router.push(
        {
          pathname: router.pathname as any,
          query: {
            ...router.query,
          },
        },
        undefined,
        { shallow: true, locale: language as Locale }
      )
    },
    [activateLocale, router]
  )

  return (
    <I18nProvider i18n={i18n}>
      <ChangeLanguageContextProvider value={{ changeLanguage }}>
        {children}
      </ChangeLanguageContextProvider>
    </I18nProvider>
  )
}
