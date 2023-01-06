import { Stack } from "@mantine/core"
import { Citation } from "~/components/common/Citation"
import { InfoTab } from "~/components/sr/InfoTab"
import { ModuleInfo } from "~/components/sr/ModuleInfo"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const AdrenalMriInfo = () => {
  const { t } = useStructureTranslation()

  return (
    <ModuleInfo>
      <InfoTab title={t("AdrenalMri.references")}>
        <Stack>
          <Citation
            title="Adrenal Imaging"
            authors="Michael A. Blake, Carmel G. Cronin and Giles W. Boland"
            journal="American Journal of Roentgenology. 2010 194: 1450-1460"
          />
          <Citation
            title="Update on CT and MRI of Adrenal Nodules"
            authors="Nicola Schieda and Evan S. Siegelman"
            journal="American Journal of Roentgenology. 2017 208: 1206-1217"
          />
        </Stack>
      </InfoTab>
    </ModuleInfo>
  )
}
