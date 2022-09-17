import { useRouter } from "next/router"
import { useI18nSite } from "../../contexts/I18nSiteContext"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { LanguageChooser } from "./LanguageChooser"

export const SiteLanguageChooser = () => {
  const router = useRouter()
  const { supportedSiteLanguages } = useI18nSite()
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
    <LanguageChooser
      actionTitle={t("SiteLanguageChooser.buttonLanguageGeneral")}
      currentLanguage={router.locale}
      supportedLanguages={supportedSiteLanguages}
      onLocaleChanged={onLocaleChanged}
    />
  )
}
