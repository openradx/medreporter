import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const PrecisionProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="precision" label={t("PrecisionProperty.label")} />
}
