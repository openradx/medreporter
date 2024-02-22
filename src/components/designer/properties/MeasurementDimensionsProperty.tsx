import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MeasurementDimensionsProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <NumberPropertyInput
      name="dimensions"
      label={t("MeasurementDimensionsProperty.label")}
      min={1}
      max={3}
    />
  )
}
