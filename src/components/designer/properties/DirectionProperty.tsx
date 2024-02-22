import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const DirectionProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <SelectPropertyInput
      name="direction"
      label={t("DirectionProperty.label")}
      data={[
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ]}
    />
  )
}
