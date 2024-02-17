import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const GrowProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanPropertyInput name="grow" label={t("GrowProperty.label")} />
}
