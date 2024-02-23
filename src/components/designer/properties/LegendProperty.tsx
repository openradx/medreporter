import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LegendProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="legend" label={t("LegendProperty.label")} />
}
