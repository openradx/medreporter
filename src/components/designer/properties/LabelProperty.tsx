import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextMetaProperty } from "./TextMetaProperty"

export const LabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextMetaProperty name="label" label={t("LabelProperty.label")} />
}
