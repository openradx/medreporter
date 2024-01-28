import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const BorderProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="border" label={t("BorderProperty.label")} />
}
