import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LinkedMeasurementsFieldProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <TextInputPropertyInput
      name="linkedMeasurementsField"
      label={t("LinkedMeasurementsFieldProperty.label")}
    />
  )
}
