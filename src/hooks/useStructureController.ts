import { useCallback, useEffect } from "react"
import { useController } from "react-hook-form"
import { useStructureForm } from "../contexts/StructureFormContext"

export const useStructureController = <T>({
  moduleId,
  fieldId,
  defaultValue,
}: {
  moduleId: string
  fieldId: "present" | string
  defaultValue: T
}): { value: T; onChange: (value: T) => void } => {
  const {
    field: { value, onChange },
  } = useController({ name: `${moduleId}.${fieldId}`, defaultValue })

  const { registerDefaultValue, unregisterDefaultValue } = useStructureForm()

  useEffect(() => {
    registerDefaultValue(moduleId, fieldId, defaultValue)
    return () => {
      unregisterDefaultValue(moduleId, fieldId)
    }
  }, [registerDefaultValue, unregisterDefaultValue, moduleId, fieldId, defaultValue])

  const handleChange = useCallback(
    (newValue: T) => {
      onChange(newValue)
    },
    [onChange]
  )

  return { value, onChange: handleChange }
}
