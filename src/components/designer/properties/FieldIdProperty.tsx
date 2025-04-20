import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FieldIdProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="fieldId" label={t`ID`} />
}
