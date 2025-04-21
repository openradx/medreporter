import { useLingui } from "@lingui/react/macro"
import { useMicroI18nTemplate } from "~/contexts/MicroI18nTemplateContext"
import { LanguageChooser } from "../common/LanguageChooser"

export const ReportLanguageChooser = () => {
  const { t } = useLingui()
  const i18nTemplate = useMicroI18nTemplate()
  if (!i18nTemplate) return null

  const { i18nReport, reportLanguage, setReportLanguage } = i18nTemplate

  return (
    <LanguageChooser
      actionTitle={t`Report language`}
      currentLanguage={reportLanguage}
      supportedLanguages={["asSite", ...(i18nReport.supportedLanguages as string[])]}
      onLanguageChanged={setReportLanguage}
    />
  )
}
