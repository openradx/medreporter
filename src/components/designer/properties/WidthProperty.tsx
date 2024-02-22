import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const WidthProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <SelectPropertyInput
      name="width"
      label={t("WidthProperty.label")}
      data={[
        { label: "Auto", value: "auto" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Full", value: "full" },
      ]}
    />
  )
}
