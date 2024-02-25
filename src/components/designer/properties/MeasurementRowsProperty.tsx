import { Controller } from "react-hook-form"
import { NumberInput } from "~/components/inputs/NumberInput"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"

export const MeasurementRowsProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const { rows } = getMeasurementsDataParams(value)
        const handleChange = (newRows: number | null) => {
          const newValue = measurementsReducer(value, { type: "changeRows", rows: newRows ?? 1 })
          onChange(newValue)
        }
        return (
          <NumberInput
            label={t("MeasurementRowsProperty.label")}
            value={rows}
            onChange={handleChange}
            error={error?.message}
            min={1}
          />
        )
      }}
    />
  )
}
