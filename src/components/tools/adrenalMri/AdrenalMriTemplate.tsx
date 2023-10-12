import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { AdrenalMriReport } from "./AdrenalMriReport"
import { AdrenalMriStructure } from "./AdrenalMriStructure"
import adrenalMriInfo_en from "./adrenalMriInfo_en.md"

export const AdrenalMriTemplate = () => {
  const { t } = useStructureTranslation()
  return (
    <Template title={t("AdrenalMri.toolTitle")} info={adrenalMriInfo_en}>
      <AdrenalMriStructure />
      <AdrenalMriReport />
    </Template>
  )
}
