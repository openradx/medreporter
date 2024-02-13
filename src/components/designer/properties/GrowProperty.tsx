import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const GrowProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="grow" label={t("GrowProperty.label")} />
}
