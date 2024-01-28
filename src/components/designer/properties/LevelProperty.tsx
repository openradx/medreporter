import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectMetaProperty } from "./SelectMetaProperty"

export const LevelProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectMetaProperty
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
