import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const PreviousLabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="previousLabel" label={t("PreviousLabelProperty.label")} />
}
