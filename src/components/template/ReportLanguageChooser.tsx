import { useMicroI18nTemplate } from "~/contexts/MicroI18nTemplateContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { LanguageChooser } from "../common/LanguageChooser"

export const ReportLanguageChooser = () => {
  const { t } = useSiteTranslation()
  const i18nTemplate = useMicroI18nTemplate()
  if (!i18nTemplate) return null

  const { i18nReport, reportLanguage, setReportLanguage } = i18nTemplate

  return (
    <LanguageChooser
      actionTitle={t("ReportLanguageChooser.buttonLanguageReport")}
      currentLanguage={reportLanguage}
      supportedLanguages={["asSite", ...(i18nReport.supportedLanguages as string[])]}
      onLanguageChanged={setReportLanguage}
    />
  )
}
