import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const BooleanDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanPropertyInput name="default" label={t("BooleanDefaultProperty.label")} />
}
