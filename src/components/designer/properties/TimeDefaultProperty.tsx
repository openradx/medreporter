import { useLingui } from "@lingui/react/macro"
import { TimeInput } from "@mantine/dates"
import { Controller } from "react-hook-form"
import { TimeFieldNode } from "~/schemas/structure"

interface TimeDefaultPropertyProps {
  node: TimeFieldNode
}

export const TimeDefaultProperty = ({ node }: TimeDefaultPropertyProps) => {
  const { t } = useLingui()

  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TimeInput
          label={t`Default value`}
          value={value}
          onChange={onChange}
          error={error?.message}
          withSeconds={node.withSeconds}
        />
      )}
    />
  )
}
