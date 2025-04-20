import { useLingui } from "@lingui/react/macro"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const MultipleChoiceVariantProperty = () => {
  const { t } = useLingui()

  return (
    <SelectPropertyInput
      name="variant"
      label={t`Variant`}
      data={[
        { label: t`Select`, value: "select" },
        { label: t`Checkbox`, value: "checkbox" },
      ]}
    />
  )
}
