import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LocationLabelProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="locationLabel" label={t("LocationLabelProperty.label")} />
}
