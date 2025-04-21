import { useLingui } from "@lingui/react/macro"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MaxRowsProperty = () => {
  const { t } = useLingui()

  return <NumberPropertyInput name="maxRows" label={t`Maximum rows`} min={1} />
}
