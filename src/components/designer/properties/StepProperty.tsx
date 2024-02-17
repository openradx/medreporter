import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const StepProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberPropertyInput name="step" label={t("StepProperty.label")} min={0} />
}
