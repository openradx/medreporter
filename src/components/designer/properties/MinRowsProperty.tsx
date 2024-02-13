import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const MinRowsProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="minRows" label={t("MinRowsProperty.label")} />
}
