import { TimeInput } from "@mantine/dates"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const TimeDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TimeInput
          label={t("TimeDefaultProperty.label")}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
