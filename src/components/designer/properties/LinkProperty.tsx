import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LinkProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="link" label={t`Link`} />
}
