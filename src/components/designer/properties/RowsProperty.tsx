import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const RowsProperty = () => {
  const { t } = useSiteTranslation()

  return <NumberPropertyInput name="rows" label={t("RowsProperty.label")} />
}
