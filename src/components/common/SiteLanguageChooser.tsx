import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { LanguageChooser } from "./LanguageChooser"

export const SiteLanguageChooser = () => {
  const { t, supportedSiteLanguages, currentSiteLanguage, setCurrentSiteLanguage } =
    useSiteTranslation()

  return (
    <LanguageChooser
      actionTitle={t("SiteLanguageChooser.buttonLanguageGeneral")}
      currentLanguage={currentSiteLanguage}
      supportedLanguages={supportedSiteLanguages}
      onLanguageChanged={setCurrentSiteLanguage}
    />
  )
}
