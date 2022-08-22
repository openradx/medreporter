import { NumberInput as MantineNumberInput } from "@mantine/core"
import { ReactNode, useState } from "react"
import { ScrollBlocker } from "../common/ScrollBlocker"
import { InputLabel } from "./InputLabel"

const SCROLL_SENSITIVITY = 4

interface NumberInputProps {
  label?: string
  value: number | null
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  startValue?: number
  precision?: number
  extras?: ReactNode
  width?: number
  autoHideControls?: boolean
  disabled?: boolean
}

export const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  startValue,
  precision = 0,
  extras,
  disabled,
  width,
  autoHideControls = false,
}: NumberInputProps) => {
  const [focus, setFocus] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollBlocker focus={focus}>
      <MantineNumberInput
        label={(label || extras) && <InputLabel label={label} extras={extras} />}
        autoComplete="off"
        wrapperProps={{
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          onWheel: (event: WheelEvent) => {
            let key: "ArrowUp" | "ArrowDown" | null = null
            if (focus && event.deltaY < -SCROLL_SENSITIVITY) key = "ArrowUp"
            else if (focus && event.deltaY > SCROLL_SENSITIVITY) key = "ArrowDown"

            if (key && event.currentTarget instanceof Element) {
              const input = event.currentTarget.querySelector("input")
              input!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }))
              input!.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }))
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
