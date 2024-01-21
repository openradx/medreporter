import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const FieldIdProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="fieldId"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label={t("FieldIdProperty.label")}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
