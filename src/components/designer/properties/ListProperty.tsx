import { useLingui } from "@lingui/react/macro"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const ListProperty = () => {
  const { t } = useLingui()

  return <BooleanPropertyInput name="list" label={t`List`} />
}
