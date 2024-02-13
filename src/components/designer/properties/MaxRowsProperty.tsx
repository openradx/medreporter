import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const MaxRowsProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="maxRows" label={t("MaxRowsProperty.label")} />
}
