import { useLingui } from "@lingui/react/macro"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const MultilineProperty = () => {
  const { t } = useLingui()

  return <BooleanPropertyInput name="multiline" label={t`Multiline`} />
}
