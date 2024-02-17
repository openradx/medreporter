import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const LevelProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectPropertyInput
      name="level"
      label={t("LevelProperty.label")}
      data={[
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
      ]}
    />
  )
}
