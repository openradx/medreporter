import { useLingui } from "@lingui/react/macro"
import { ScriptPropertyInput } from "./ScriptPropertyInput"

export const DisabledProperty = () => {
  const { t } = useLingui()

  return (
    <ScriptPropertyInput
      name="disabled"
      label={t`Disabled`}
      modalTitle={t`Disabled`}
      modalDescription={t`When the script evaluates to true the field is read-only.`}
    />
  )
}
