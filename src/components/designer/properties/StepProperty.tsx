import { useLingui } from "@lingui/react/macro"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const StepProperty = () => {
  const { t } = useLingui()

  return <NumberPropertyInput name="step" label={t`Step`} min={0} />
}
