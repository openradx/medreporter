import { useLingui } from "@lingui/react/macro"
import { Switch } from "@mantine/core"
import { ChangeEvent } from "react"
import { Controller } from "react-hook-form"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"

export const FollowUpProperty = () => {
  const { t } = useLingui()

  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const { followUp } = getMeasurementsDataParams(value)
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const newValue = measurementsReducer(value, {
            type: "changeFollowUp",
            hasPrevious: event.target.checked,
          })
          onChange(newValue)
        }
        return (
          <Switch
            label={t`Follow up`}
            checked={followUp}
            onChange={handleChange}
            error={error?.message}
          />
        )
      }}
    />
  )
}
