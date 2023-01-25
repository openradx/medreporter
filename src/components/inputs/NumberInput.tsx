import { NumberInput as MantineNumberInput, NumberInputHandlers } from "@mantine/core"
import { ReactNode, useRef, useState } from "react"
import { ScrollBlocker } from "../common/ScrollBlocker"
import { InputLabel } from "./InputLabel"

const SCROLL_SENSITIVITY = 4

interface NumberInputProps {
  label?: string
  extras?: ReactNode
  value: number | null
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  startValue?: number
  precision?: number
  disabled?: boolean
  width?: number
  autoHideControls?: boolean
}

export const NumberInput = ({
  label,
  extras,
  value,
  onChange,
  min,
  max,
  step,
  startValue,
  precision = 0,
  disabled,
  width,
  autoHideControls = false,
}: NumberInputProps) => {
  const [focus, setFocus] = useState(false)
  const [hovered, setHovered] = useState(false)
  const handlers = useRef<NumberInputHandlers>()

  return (
    <ScrollBlocker focus={focus}>
      <MantineNumberInput
        handlersRef={handlers}
        label={(label || extras) && <InputLabel label={label} extras={extras} />}
        autoComplete="off"
        wrapperProps={{
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          onWheel: (event: WheelEvent) => {
            if (focus && event.currentTarget instanceof Element) {
              if (event.deltaY < -SCROLL_SENSITIVITY) {
                handlers.current?.increment()
              } else if (event.deltaY > SCROLL_SENSITIVITY) {
                handlers.current?.decrement()
              }
            }
          },
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value ?? undefined}
        onChange={(newValue) => onChange(newValue ?? null)}
        min={min}
        max={max}
        step={step ?? 1 / 10 ** precision}
        startValue={startValue}
        stepHoldDelay={300}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        precision={precision}
        disabled={disabled}
        styles={{
          wrapper: { width },
          control: {
            flexGrow: 1,
            flex: "auto",
            "&:hover": { flex: "0 0 60%" },
          },
          rightSection: {
            alignItems: "stretch",
            display: !autoHideControls || focus || hovered ? undefined : "none",
          },
          label: { maxWidth: "100%" },
        }}
      />
    </ScrollBlocker>
  )
}
