import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { Fleischner2017Report } from "./Fleischner2017Report"
import { Fleischner2017Structure } from "./Fleischner2017Structure"
import toolInfo_de from "./fleischner2017ToolInfo_de.md"
import toolInfo_en from "./fleischner2017ToolInfo_en.md"
import { i18nStructure } from "./locales"

export const Fleischner2017Template = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const toolInfo = {
    de: toolInfo_de,
    en: toolInfo_en,
  }[currentLanguage]

  return (
    <Template title={t("Fleischner2017.toolTitle")} name="fleischner2017" info={toolInfo}>
      <Fleischner2017Structure />
      <Fleischner2017Report />
    </Template>
  )
}
