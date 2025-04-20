import { useLingui } from "@lingui/react/macro"
import { Input } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MeasurementsDefaultButton } from "../measurementsDefaultEditor/MeasurementsDefaultButton"

export const MeasurementsDefaultProperty = () => {
  const { t } = useLingui()

  return (
    <Controller
      name="default"
      render={({ fieldState: { error } }) => (
        <Input.Wrapper label={t`Default`} error={error?.message}>
          <MeasurementsDefaultButton />
        </Input.Wrapper>
      )}
    />
  )
}
