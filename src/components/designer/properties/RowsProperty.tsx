import { useLingui } from "@lingui/react/macro"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const RowsProperty = () => {
  const { t } = useLingui()

  return <NumberPropertyInput name="rows" label={t`Rows`} />
}
