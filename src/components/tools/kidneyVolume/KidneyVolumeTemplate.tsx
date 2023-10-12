import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { KidneyVolumeReport } from "./KidneyVolumeReport"
import { KidneyVolumeStructure } from "./KidneyVolumeStructure"

export const KidneyVolumeTemplate = () => {
  const { t } = useStructureTranslation()

  return (
    <Template title={t("KidneyVolume.toolTitle")}>
      <KidneyVolumeStructure />
      <KidneyVolumeReport />
    </Template>
  )
}
