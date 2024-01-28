import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectMetaProperty } from "./SelectMetaProperty"

export const DirectionProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectMetaProperty
      name="direction"
      label={t("DirectionProperty.label")}
      data={[
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ]}
    />
  )
}
