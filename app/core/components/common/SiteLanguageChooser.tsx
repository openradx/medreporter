import { useRouter } from "next/router"
import { SiteLanguage } from "types"
import { useI18nSite } from "../../contexts/I18nSiteContext"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { LanguageChooser } from "./LanguageChooser"

export const SiteLanguageChooser = () => {
  const router = useRouter()
  const { i18nSite, supportedSiteLanguages, currentSiteLanguage, setCurrentSiteLanguage } =
    useI18nSite()
  const { t } = useSiteTranslation()

  const onLanguageChanged = (language: SiteLanguage) => {
    i18nSite.changeLanguage(language, () => {
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
      setCurrentSiteLanguage(language)
    })
  }

  if (!router.locale) {
    throw new Error("Missing locale. I18n must be configured in Next.")
  }

  return (
    <LanguageChooser
      actionTitle={t("SiteLanguageChooser.buttonLanguageGeneral")}
      currentLanguage={currentSiteLanguage}
      supportedLanguages={supportedSiteLanguages}
      onLanguageChanged={onLanguageChanged}
    />
  )
}
