import { useLingui } from "@lingui/react/macro"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const LegendProperty = () => {
  const { t } = useLingui()

  return <TextInputPropertyInput name="legend" label={t`Legend`} />
}
