import { useLingui } from "@lingui/react/macro"
import { DateInput } from "@mantine/dates"
import { Controller } from "react-hook-form"
import { DateFieldNode } from "~/schemas/structure"

interface DateDefaultPropertyProps {
  node: DateFieldNode
}

export const DateDefaultProperty = ({ node }: DateDefaultPropertyProps) => {
  const { t } = useLingui()

  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <DateInput
          label={t`Default value`}
          value={value || null}
          onChange={onChange}
          error={error?.message}
          valueFormat={node.format || "YYYY-MM-DD"}
          clearable
        />
      )}
    />
  )
}
