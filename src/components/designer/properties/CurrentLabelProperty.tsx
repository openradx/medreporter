import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const CurrentLabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="currentLabel" label={t("CurrentLabelProperty.label")} />
}
