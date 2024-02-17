import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="label" label={t("LabelProperty.label")} />
}
