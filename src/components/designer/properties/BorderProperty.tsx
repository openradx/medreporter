import { useLingui } from "@lingui/react/macro"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const BorderProperty = () => {
  const { t } = useLingui()
  return <BooleanPropertyInput name="border" label={t`Border`} />
}
