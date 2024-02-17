import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStructure } from "./AdrenalWashoutStructure"
import adrenalWashoutInfo_de from "./adrenalWashoutInfo_de.md"
import adrenalWashoutInfo_en from "./adrenalWashoutInfo_en.md"
import { i18nStructure } from "./locales"

export const AdrenalWashoutTemplate = () => {
  const { t, currentLanguage } = useMicroTranslation(i18nStructure)

  const toolInfo = {
    de: adrenalWashoutInfo_de,
    en: adrenalWashoutInfo_en,
  }[currentLanguage]

  return (
    <Template title={t("AdrenalWashout.toolTitle")} name="adrenalwashout" info={toolInfo}>
      <AdrenalWashoutStructure />
      <AdrenalWashoutReport />
    </Template>
  )
}
