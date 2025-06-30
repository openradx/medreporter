import { useLingui } from "@lingui/react/macro"
import { Slider, Text } from "@mantine/core"
import { Controller } from "react-hook-form"

export const PrecisionProperty = () => {
  const { t } = useLingui()

  return (
    <Controller
      name="precision"
      render={({ field: { value, onChange } }) => (
        <div>
          <Text size="sm" fw={500}>
            {t`Precision`}
          </Text>
          <Slider
            min={0}
            max={3}
            step={1}
            size="lg"
            marks={[
              { label: t`0`, value: 0 },
              { label: t`1`, value: 1 },
              { label: t`2`, value: 2 },
              { label: t`3`, value: 3 },
            ]}
            value={value}
            onChange={onChange}
            mb={8}
          />
        </div>
      )}
    />
  )
}
