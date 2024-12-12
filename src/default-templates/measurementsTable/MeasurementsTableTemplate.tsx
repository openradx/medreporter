import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"
import { i18nStructure } from "./locales"

export const MeasurementsTableTemplate = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Template title={t("MeasurementsTable.toolTitle")} name="measurementstable">
      <MeasurementsTableStructure />
      <MeasurementsTableReport />
    </Template>
  )
}
