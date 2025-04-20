import { useLingui } from "@lingui/react/macro"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const DirectionProperty = () => {
  const { t } = useLingui()

  return (
    <SelectPropertyInput
      name="direction"
      label={t`Direction`}
      data={[
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ]}
    />
  )
}
