import { useLingui } from "@lingui/react/macro"
import { ScriptPropertyInput } from "./ScriptPropertyInput"

export const HiddenProperty = () => {
  const { t } = useLingui()

  return (
    <ScriptPropertyInput
      name="hidden"
      label={t`Hidden`}
      modalTitle={t`Hidden`}
      modalDescription={t`When the script evaluates to true the field is not displayed.`}
    />
  )
}
