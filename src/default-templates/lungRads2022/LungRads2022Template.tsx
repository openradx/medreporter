import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { LungRads2022Report } from "./LungRads2022Report"
import { LungRads2022Structure } from "./LungRads2022Structure"
import { i18nStructure } from "./locales"
import toolInfo_de from "./lungRads2022ToolInfo_de.md"
import toolInfo_en from "./lungRads2022ToolInfo_en.md"

export const LungRads2022Template = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const toolInfo = {
    de: toolInfo_de,
    en: toolInfo_en,
  }[currentLanguage]

  return (
    <Template slug="lungrads2022" title={t("LungRads2022.toolTitle")} info={toolInfo}>
      <LungRads2022Structure />
      <LungRads2022Report />
    </Template>
  )
}
