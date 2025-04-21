import { useLingui } from "@lingui/react/macro"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const WidthProperty = () => {
  const { t } = useLingui()

  return (
    <SelectPropertyInput
      name="width"
      label={t`Width`}
      data={[
        { label: t`Auto`, value: "auto" },
        { label: t`Small`, value: "small" },
        { label: t`Medium`, value: "medium" },
        { label: t`Large`, value: "large" },
        { label: t`Full`, value: "full" },
      ]}
    />
  )
}
