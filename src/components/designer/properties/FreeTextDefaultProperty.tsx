import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FreeTextDefaultProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="default" label={t`Default value`} />
}
