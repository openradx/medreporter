import { Input } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MeasurementsDefaultButton } from "../measurementsDefaultEditor/MeasurementsDefaultButton"

export const MeasurementsDefaultProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="default"
      render={({ fieldState: { error } }) => (
        <Input.Wrapper label={t("MeasurementsDefaultProperty.label")} error={error?.message}>
          <MeasurementsDefaultButton />
        </Input.Wrapper>
      )}
    />
  )
}
