import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LocationLabelProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="locationLabel" label={t`Label location`} />
}
