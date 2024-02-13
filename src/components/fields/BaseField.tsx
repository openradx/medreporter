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
  width?: "auto" | "small" | "medium" | "large" | "full"
  children: ReactNode
}

export const BaseField = <TValue,>({
  fieldId,
  defaultValue,
  label,
  value,
  onChange,
  hidden,
  width = "auto",
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

  let fieldWidth
  switch (width) {
    case "auto": {
      fieldWidth = "fit-content"
      break
    }
    case "small": {
      fieldWidth = "200px"
      break
    }
    case "medium": {
      fieldWidth = "350px"
      break
    }
    case "large": {
      fieldWidth = "500px"
      break
    }
    case "full": {
      fieldWidth = "100%"
      break
    }
  }

  // TODO: for finding and group we maybe also have to return an unstyled box.
  // But some element we need for the ref for the scroll into
  return (
    <FieldContextProvider value={{ id: fieldId, label, defaultValue, value, onChange }}>
      <Box ref={fieldEl} display={hidden ? "none" : undefined} w={fieldWidth}>
        {children}
      </Box>
    </FieldContextProvider>
  )
}
