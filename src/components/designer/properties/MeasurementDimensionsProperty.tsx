import { Controller } from "react-hook-form"
import { NumberInput } from "~/components/inputs/NumberInput"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { Dimensions } from "~/types/measurements"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"

export const MeasurementDimensionsProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const { dimensions } = getMeasurementsDataParams(value)
        const handleChange = (newDimensions: number | null) => {
          const newValue = measurementsReducer(value, {
            type: "changeDimensions",
            dimensions: (newDimensions as Dimensions) ?? 1,
          })
          onChange(newValue)
        }
        return (
          <NumberInput
            label={t("MeasurementDimensionsProperty.label")}
            value={dimensions}
            onChange={handleChange}
            error={error?.message}
            min={1}
            max={3}
          />
        )
      }}
    />
  )
}
