import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const ListProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="list" label={t("ListProperty.label")} />
}
