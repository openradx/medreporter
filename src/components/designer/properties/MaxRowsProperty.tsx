import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MaxRowsProperty = () => {
  const { t } = useSiteTranslation()

  return <NumberPropertyInput name="maxRows" label={t("MaxRowsProperty.label")} />
}
