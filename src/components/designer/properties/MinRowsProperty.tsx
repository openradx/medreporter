import { useLingui } from "@lingui/react/macro"
import { NumberPropertyInput } from "./NumberPropertyInput"

export const MinRowsProperty = () => {
  const { t } = useLingui()

  return <NumberPropertyInput name="minRows" label={t`Minimum rows`} min={1} />
}
