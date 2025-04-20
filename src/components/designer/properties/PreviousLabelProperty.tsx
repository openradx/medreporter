import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const PreviousLabelProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="previousLabel" label={t`Label previous`} />
}
