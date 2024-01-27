import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const MinProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="min" label={t("MinProperty.label")} />
}
