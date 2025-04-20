import { useLingui } from "@lingui/react/macro"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const SingleChoiceVariantProperty = () => {
  const { t } = useLingui()

  return (
    <SelectPropertyInput
      name="variant"
      label={t`Variant`}
      data={[
        { label: t`Select`, value: "select" },
        { label: t`Radio`, value: "radio" },
      ]}
    />
  )
}
