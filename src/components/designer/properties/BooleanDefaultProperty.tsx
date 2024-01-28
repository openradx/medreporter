import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const BooleanDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="default" label={t("BooleanDefaultProperty.label")} />
}
