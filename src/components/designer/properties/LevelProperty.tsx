import { useLingui } from "@lingui/react/macro"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const LevelProperty = () => {
  const { t } = useLingui()

  return (
    <SelectPropertyInput
      name="level"
      label={t`Level`}
      data={[
        { label: t`Info`, value: "info" },
        { label: t`Warning`, value: "warning" },
        { label: t`Error`, value: "error" },
      ]}
    />
  )
}
