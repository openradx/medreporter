import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const MaxProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="max" label={t("MaxProperty.label")} />
}
