import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NumberMetaProperty } from "./NumberMetaProperty"

export const StartProperty = () => {
  const { t } = useSiteTranslation()
  return <NumberMetaProperty name="start" label={t("StartProperty.label")} />
}
