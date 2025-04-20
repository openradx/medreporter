import { useLingui } from "@lingui/react/macro"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const FindingDefaultProperty = () => {
  const { t } = useLingui()
  return <BooleanPropertyInput name="default" label={t`Default`} />
}
