import { useLingui } from "@lingui/react/macro"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { LanguageChooser } from "./LanguageChooser"

export const SiteLanguageChooser = () => {
  const { supportedSiteLanguages, currentSiteLanguage, setCurrentSiteLanguage } =
    useSiteTranslation()
  const { t } = useLingui()

  return (
    <LanguageChooser
      actionTitle={t`General language`}
      currentLanguage={currentSiteLanguage}
      supportedLanguages={supportedSiteLanguages}
      onLanguageChanged={setCurrentSiteLanguage}
    />
  )
}
