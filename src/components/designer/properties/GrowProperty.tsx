import { useLingui } from "@lingui/react/macro"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const GrowProperty = () => {
  const { t } = useLingui()

  return <BooleanPropertyInput name="grow" label={t`Grow`} />
}
