import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const RowsProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="rows" label={t("RowsProperty.label")} />
}
