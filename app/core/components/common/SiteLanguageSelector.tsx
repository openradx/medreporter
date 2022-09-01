import { useRouter } from "next/router"
import { useI18nSite } from "../../contexts/I18nSiteContext"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { LanguageSelector } from "./LanguageSelector"

export const SiteLanguageSelector = () => {
  const router = useRouter()
  const { supportedSiteLocales } = useI18nSite()
  const { t, i18n } = useSiteTranslation()

  const onLocaleChanged = (locale: string) => {
    i18n.changeLanguage(locale, () => {
      if (locale !== "cimode") {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
            },
          },
          undefined,
          { shallow: true, locale }
        )
      }
    })
  }

  if (!router.locale) {
    throw new Error("Missing locale. I18n must be configured in Next.")
  }

  return (
    <LanguageSelector
      actionTitle={t("SiteLanguageSelector.button_title_language_general")}
      currentLocale={router.locale}
      supportedLocales={supportedSiteLocales}
      onLocaleChanged={onLocaleChanged}
    />
  )
}
