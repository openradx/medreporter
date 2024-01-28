import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const StepProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="step" label={t("StepProperty.label")} />
}
