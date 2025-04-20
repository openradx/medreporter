import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const TitleProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="title" label={t`Title`} />
}
