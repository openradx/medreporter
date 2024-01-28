import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanMetaProperty } from "./BooleanMetaProperty"

export const WithSecondsProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanMetaProperty name="withSeconds" label={t("WithSecondsProperty.label")} />
}
