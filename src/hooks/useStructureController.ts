import { useCallback, useEffect } from "react"
import { useController } from "react-hook-form"
import { useStructureForm } from "~/contexts/StructureFormContext"

export const useStructureController = <T>({
  fieldId,
  defaultValue,
}: {
  fieldId: string
  defaultValue: T
}): { value: T; onChange: (value: T) => void } => {
  const {
    field: { value, onChange },
  } = useController({ name: `${fieldId}`, defaultValue })

  const { registerDefaultValue, unregisterDefaultValue } = useStructureForm()

  useEffect(() => {
    registerDefaultValue(fieldId, defaultValue)
    return () => {
      unregisterDefaultValue(fieldId)
    }
  }, [registerDefaultValue, unregisterDefaultValue, fieldId, defaultValue])

  const handleChange = useCallback(
    (newValue: T) => {
      onChange(newValue)
    },
    [onChange]
  )

  return { value, onChange: handleChange }
}
