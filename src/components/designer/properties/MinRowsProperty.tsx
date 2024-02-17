import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MinRowsProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberPropertyInput name="minRows" label={t("MinRowsProperty.label")} />
}
