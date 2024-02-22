import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const MultilineProperty = () => {
  const { t } = useSiteTranslation()

  return <BooleanPropertyInput name="multiline" label={t("MultilineProperty.label")} />
}
