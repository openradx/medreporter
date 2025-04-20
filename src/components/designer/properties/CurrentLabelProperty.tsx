import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const CurrentLabelProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="currentLabel" label={t`Label current`} />
}
