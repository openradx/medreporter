import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const NumberDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="default" label={t("NumberDefaultProperty.label")} />
}
