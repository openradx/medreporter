import { Template } from "~/components/template/Template"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { MeasurementsTableReport } from "./MeasurementsTableReport"
import { MeasurementsTableStructure } from "./MeasurementsTableStructure"
import { i18nStructure } from "./locales"

export const MeasurementsTableTemplate = () => {
  const { t } = useMicroTranslation(i18nStructure)

  return (
    <Template slug="measurementstable" title={t("MeasurementsTable.toolTitle")}>
      <MeasurementsTableStructure />
      <MeasurementsTableReport />
    </Template>
  )
}
