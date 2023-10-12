import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { AdrenalWashoutReport } from "./AdrenalWashoutReport"
import { AdrenalWashoutStructure } from "./AdrenalWashoutStructure"
import adrenalWashoutInfo_en from "./adrenalWashoutInfo_en.md"

export const AdrenalWashoutTemplate = () => {
  const { t } = useStructureTranslation()
  return (
    <Template title={t("AdrenalWashout.toolTitle")} info={adrenalWashoutInfo_en}>
      <AdrenalWashoutStructure />
      <AdrenalWashoutReport />
    </Template>
  )
}
