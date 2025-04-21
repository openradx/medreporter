import { useLingui } from "@lingui/react/macro"
import { useRouter } from "next/router"
import { useChangeLanguage } from "~/contexts/ChangeLanguageContext"
import { LanguageChooser } from "./LanguageChooser"

export const SiteLanguageChooser = () => {
  const { t } = useLingui()
  const { changeLanguage } = useChangeLanguage()
  const { locale, locales } = useRouter()

  return (
    <LanguageChooser
      actionTitle={t`General language`}
      currentLanguage={locale}
      supportedLanguages={locales}
      onLanguageChanged={changeLanguage}
      disableDebugMode
    />
  )
}
