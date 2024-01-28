import { DateInput } from "@mantine/dates"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { DateFieldNode } from "~/schemas/structure"

interface DateDefaultPropertyProps {
  node: DateFieldNode
}
export const DateDefaultProperty = ({
  node,
}: DateDefaultPropertyProps & { node: DateFieldNode }) => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <DateInput
          label={t("DateDefaultProperty.label")}
          value={value ? new Date(value) : null}
          onChange={(newValue) => onChange(newValue?.toISOString() ?? null)}
          error={error?.message}
          clearable
          valueFormat={node.format}
        />
      )}
    />
  )
}
