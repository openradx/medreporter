import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const ReferenceLabelProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="referenceLabel" label={t`Label reference`} />
}
