import { Box } from "@mantine/core"
import { PropsWithChildren, useEffect, useRef } from "react"
import { getFieldContext } from "../../contexts/FieldContext"
import { selectScrollInto } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface FieldProps<T> {
  moduleId: string
  fieldId: string
  visible: boolean
  defaultValue: T
  value: T
  onChange: (newValue: T) => void
}

export const BaseField = <T,>({
  moduleId,
  fieldId,
  visible,
  defaultValue,
  value,
  onChange,
  children,
}: PropsWithChildren<FieldProps<T>>) => {
  const scrollInto = useAppSelector(selectScrollInto)
  const fieldEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === moduleId && scrollInto.fieldId === fieldId) {
      fieldEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, moduleId, fieldId])

  const { FieldContextProvider } = getFieldContext<T>()

  // TODO: for finding and group we maybe also have to return an unstyled box.
  // But some element we need for the ref for the scroll into
  return (
    <FieldContextProvider value={{ id: fieldId, defaultValue, value, onChange }}>
      <Box ref={fieldEl} sx={{ display: !visible ? "none" : undefined }}>
        {children}
      </Box>
    </FieldContextProvider>
  )
}
