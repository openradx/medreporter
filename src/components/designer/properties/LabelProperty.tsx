import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const LabelProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label={t("LabelProperty.label")}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
