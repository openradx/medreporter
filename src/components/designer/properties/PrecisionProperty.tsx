import { useLingui } from "@lingui/react/macro"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const PrecisionProperty = () => {
  const { t } = useLingui()

  return <NumberPropertyInput name="precision" label={t`Precision`} min={0} max={3} />
}
