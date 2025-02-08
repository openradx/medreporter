import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { AdrenalMriReport } from "./AdrenalMriReport"
import { AdrenalMriStructure } from "./AdrenalMriStructure"
import toolInfo_de from "./adrenalMriToolInfo_de.md"
import toolInfo_en from "./adrenalMriToolInfo_en.md"
import { i18nStructure } from "./locales"

export const AdrenalMriTemplate = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const toolInfo = {
    de: toolInfo_de,
    en: toolInfo_en,
  }[currentLanguage]

  return (
    <Template slug="adrenalmri" title={t("AdrenalMri.toolTitle")} info={toolInfo}>
      <AdrenalMriStructure />
      <AdrenalMriReport />
    </Template>
  )
}
