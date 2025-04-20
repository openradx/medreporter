import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { ReactNode, useEffect, useState } from "react"
import { I18nSite } from "~/types/general"

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`~/locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

interface SiteTranslationProviderNewProps {
  i18nSiteProps: I18nSite
  children: ReactNode
}

export const SiteTranslationProviderNew = ({
  i18nSiteProps,
  children,
}: SiteTranslationProviderNewProps) => {
  const [currentSiteLanguage, _setCurrentSiteLanguage] = useState(
    i18nSiteProps.initialSiteLanguage!
  )

  useEffect(() => {
    dynamicActivate(currentSiteLanguage)
  }, [currentSiteLanguage])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
