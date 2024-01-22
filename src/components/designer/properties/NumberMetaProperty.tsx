import { NumberInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface NumberMetaPropertyProps {
  name: string
  labelKey: string
}

export const NumberMetaProperty = ({ name, labelKey }: NumberMetaPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput label={t(labelKey)} value={value} onChange={onChange} error={error?.message} />
      )}
    />
  )
}
