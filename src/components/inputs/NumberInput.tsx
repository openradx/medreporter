import { NumberInput as MantineNumberInput, NumberInputHandlers } from "@mantine/core"
import { ReactNode, useEffect, useRef, useState } from "react"
import { ScrollBlocker } from "../common/ScrollBlocker"
import { InputLabel } from "./InputLabel"
import classes from "./NumberInput.module.css"

const SCROLL_SENSITIVITY = 4

interface NumberInputProps {
  label?: string
  extras?: ReactNode
  value: number | null
  onChange: (value: number | null) => void
  disabled?: boolean
  min?: number
  max?: number
  start?: number
  step?: number
  precision?: number
  width?: number
  autoHideControls?: boolean
  error?: string
  required?: boolean
  size?: "xs" | "sm" | "md" | "lg"
}

export const NumberInput = ({
  label,
  extras,
  value,
  onChange,
  disabled,
  min,
  max,
  start,
  step,
  precision = 0,
  width,
  autoHideControls = false,
  error,
  required,
  size = "sm",
}: NumberInputProps) => {
  const [focus, setFocus] = useState(false)
  const [hovered, setHovered] = useState(false)
  const handlers = useRef<NumberInputHandlers>(null)
  const [internalValue, setInternalValue] = useState<number | string | null>(value)

  useEffect(() => {
    if (!focus) {
      setInternalValue(value)
    }
  }, [value, focus])

  const formatAndSetValue = (val: number | string | null) => {
    if (val === null || val === "") {
      setInternalValue("")
      onChange(null)
      return
    }

    let s = String(val)
    if (s.includes(".")) {
      while (s.endsWith("0")) {
        s = s.slice(0, -1)
      }
      if (s.endsWith(".")) {
        s = s.slice(0, -1)
      }
    }

    setInternalValue(s)
    const numericValue = parseFloat(s)
    if (!isNaN(numericValue)) {
      onChange(numericValue)
    } else {
      onChange(null)
    }
  }

  return (
    <ScrollBlocker focus={focus}>
      <MantineNumberInput
        handlersRef={handlers}
        label={(label || extras) && <InputLabel label={label} extras={extras} />}
        autoComplete="off"
        wrapperProps={{
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          onWheel: (event) => {
            if (focus && event.currentTarget instanceof Element) {
              if (event.deltaY < -SCROLL_SENSITIVITY) {
                handlers.current?.increment()
              } else if (event.deltaY > SCROLL_SENSITIVITY) {
                handlers.current?.decrement()
              }
            }
          },
        }}
        stepHoldDelay={500}
        stepHoldInterval={100}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false)
          formatAndSetValue(internalValue)
        }}
        value={internalValue === null ? "" : internalValue}
        onChange={(newValue) => {
          setInternalValue(newValue)
          if (typeof newValue === "number") {
            onChange(newValue)
          } else if (newValue === "") {
            onChange(null)
          }
        }}
        disabled={disabled}
        min={min}
        max={max}
        step={step ?? 1 / 10 ** precision}
        startValue={start ?? 0}
        decimalScale={precision}
        required={required}
        classNames={{
          control: classes.control,
        }}
        error={error}
        size={size}
        styles={{
          wrapper: { width },
          control: {
            flexGrow: 1,
            flex: "auto",
          },
          controls: {
            alignItems: "stretch",
            display: !autoHideControls || focus || hovered ? undefined : "none",
          },
          label: { maxWidth: "100%" },
        }}
      />
    </ScrollBlocker>
  )
}
