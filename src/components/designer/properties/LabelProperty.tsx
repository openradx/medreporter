import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const LabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputMetaProperty name="label" label={t("LabelProperty.label")} />
}
