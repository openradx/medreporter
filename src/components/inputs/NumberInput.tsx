import { Group, NumberInput as MantineNumberInput } from "@mantine/core"
import { ReactElement, useRef, useState } from "react"
import { ScrollBlocker } from "../common/ScrollBlocker"

interface NumberInputProps {
  label?: string
  onChange: (value: number | null) => void
  value: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  extras?: ReactElement
}

export const NumberInput = ({
  label,
  onChange,
  value,
  min = 0,
  max = 1000,
  step,
  precision = 0,
  extras,
}: NumberInputProps) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)

  const handleWheel = (up: boolean) => {
    const el = inputEl.current!
    const key = up ? "ArrowUp" : "ArrowDown"
    el.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }))
    el.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }))
  }

  return (
    <ScrollBlocker focus={focus}>
      <MantineNumberInput
        ref={inputEl}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        label={
          <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={4}>
            {label}
            {extras}
          </Group>
        }
        {...{ min, max }}
        value={value ?? undefined}
        onChange={(newValue) => onChange(newValue ?? null)}
        onWheel={(event) => {
          if (focus) {
            event.deltaY < -4 && handleWheel(true)
            event.deltaY > 4 && handleWheel(false)
          }
        }}
        step={step ?? 1 / 10 ** precision}
        stepHoldDelay={300}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        precision={precision}
        styles={{
          control: {
            flexGrow: 1,
            flex: "auto",
            "&:hover": { flex: "0 0 60%" },
          },
          rightSection: { alignItems: "stretch" },
        }}
      />
    </ScrollBlocker>
  )
}
