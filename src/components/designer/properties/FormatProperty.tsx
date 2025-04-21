import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FormatProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="format" label={t`Format`} />
}
