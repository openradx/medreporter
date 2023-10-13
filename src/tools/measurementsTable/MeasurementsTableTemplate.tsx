import { Template } from "~/components/template/Template"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"

export const MeasurementsTableTemplate = () => {
  const { t } = useStructureTranslation()

  return (
    <Template title={t("MeasurementsTable.toolTitle")}>
      <MeasurementsTableStructure />
      <MeasurementsTableReport />
    </Template>
  )
}
