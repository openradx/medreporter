import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const MultilineProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="multiline" label={t("MultilineProperty.label")} />
}
