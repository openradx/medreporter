import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { GfrReport } from "./GfrReport"
import { GfrStructure } from "./GfrStructure"

export const GfrTemplate = () => {
  const { t } = useStructureTranslation()

  return (
    <Template title={t("Gfr.toolTitle")}>
      <GfrStructure />
      <GfrReport />
    </Template>
  )
}
