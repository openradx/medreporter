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
  defaultSize?: Record<string, string>
}

export const BaseField = <T,>({
  moduleId,
  fieldId,
  visible,
  defaultValue,
  value,
  onChange,
  defaultSize,
  children,
}: PropsWithChildren<FieldProps<T>>) => {
  const scrollInto = useAppSelector(selectScrollInto)
  const fieldEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollInto && scrollInto.moduleId === moduleId && scrollInto.fieldId === fieldId) {
      fieldEl.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [scrollInto, moduleId, fieldId])

  const fieldSize = { minWidth: "250px", minWidthXs: "100%", maxWidth: "20%" }
  const finalSize = { ...fieldSize, ...defaultSize }

  const { FieldContextProvider } = getFieldContext<T>()

  // TODO: for finding and group we maybe also have to return an unstyled box.
  // But some element we need for the ref for the scroll into
  return (
    <FieldContextProvider value={{ id: fieldId, defaultValue, value, onChange }}>
      <Box
        ref={fieldEl}
        sx={(theme) => ({
          minWidth: finalSize.minWidth,
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            minWidth: finalSize.minWidthXs,
          },
          maxWidth: finalSize.maxWidth,
          flexGrow: 1,
          display: !visible ? "none" : undefined,
        })}
      >
        {children}
      </Box>
    </FieldContextProvider>
  )
}
