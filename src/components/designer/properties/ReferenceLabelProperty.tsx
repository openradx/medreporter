import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const ReferenceLabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="referenceLabel" label={t("ReferenceLabelProperty.label")} />
}
