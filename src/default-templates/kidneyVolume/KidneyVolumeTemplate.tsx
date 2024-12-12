import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { KidneyVolumeReport } from "./KidneyVolumeReport"
import { KidneyVolumeStructure } from "./KidneyVolumeStructure"
import { i18nStructure } from "./locales"

export const KidneyVolumeTemplate = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Template title={t("KidneyVolume.toolTitle")} name="kidneyvolume">
      <KidneyVolumeStructure />
      <KidneyVolumeReport />
    </Template>
  )
}
