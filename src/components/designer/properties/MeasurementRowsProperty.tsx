import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MeasurementRowsProperty = () => {
  const { t } = useSiteTranslation()

  return <NumberPropertyInput name="rows" label={t("MeasurementRowsProperty.label")} min={1} />
}
