import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const PrecisionProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <NumberPropertyInput name="precision" label={t("PrecisionProperty.label")} min={0} max={3} />
  )
}
