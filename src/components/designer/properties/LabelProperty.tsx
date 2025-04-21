import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LabelProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="label" label={t`Label`} />
}
