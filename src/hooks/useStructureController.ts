import { useCallback, useEffect } from "react"
import { useController } from "react-hook-form"
import { useStructureForm } from "../contexts/StructureFormContext"

export const useStructureController = <T>({
  instanceId,
  fieldId,
  defaultValue,
}: {
  instanceId: string
  fieldId: "present" | string
  defaultValue: T
}): { value: T; onChange: (value: T) => void } => {
  const {
    field: { value, onChange },
  } = useController({ name: `${instanceId}.${fieldId}`, defaultValue })

  const { registerDefaultValue, unregisterDefaultValue } = useStructureForm()

  useEffect(() => {
    registerDefaultValue(instanceId, fieldId, defaultValue)
    return () => {
      unregisterDefaultValue(instanceId, fieldId)
    }
  }, [registerDefaultValue, unregisterDefaultValue, instanceId, fieldId, defaultValue])

  const handleChange = useCallback(
    (newValue: T) => {
      onChange(newValue)
    },
    [onChange]
  )

  return { value, onChange: handleChange }
}
