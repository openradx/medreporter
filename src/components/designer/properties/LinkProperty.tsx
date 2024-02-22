import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LinkProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="link" label={t("LinkProperty.label")} />
}
