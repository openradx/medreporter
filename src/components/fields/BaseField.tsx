import { Box } from "@mantine/core"
import { ReactNode, useEffect, useRef } from "react"
import { getFieldContext } from "~/contexts/FieldContext"
import { selectShowFieldId } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"

interface FieldProps<TValue> {
  fieldId: string
  label?: string
  defaultValue: TValue
  value: TValue
  onChange: (newValue: TValue) => void
  hidden?: boolean
  children: ReactNode
}

export const BaseField = <TValue,>({
  fieldId,
  defaultValue,
  label,
  value,
  onChange,
  hidden,
  children,
}: FieldProps<TValue>) => {
  const showFieldId = useAppSelector(selectShowFieldId)
  const fieldEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fieldId === showFieldId) {
      fieldEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [fieldId, showFieldId])

  const { FieldContextProvider } = getFieldContext<TValue>()

  // TODO: for finding and group we maybe also have to return an unstyled box.
  // But some element we need for the ref for the scroll into
  return (
    <FieldContextProvider value={{ id: fieldId, label, defaultValue, value, onChange }}>
      <Box ref={fieldEl} sx={{ display: hidden ? "none" : undefined }} miw={{ base: 200, lg: 300 }}>
        {children}
      </Box>
    </FieldContextProvider>
  )
}
