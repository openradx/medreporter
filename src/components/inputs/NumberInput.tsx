import { Group, NumberInput as MantineNumberInput } from "@mantine/core"
import { ReactElement, useState } from "react"
import { ScrollBlocker } from "../common/ScrollBlocker"

const SCROLL_SENSITIVITY = 4

interface NumberInputProps {
  label?: string
  value: number | null
  onChange: (value: number | null) => void
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
  min,
  max,
  step,
  precision = 0,
  extras,
}: NumberInputProps) => {
  const [focus, setFocus] = useState(false)

  return (
    <ScrollBlocker focus={focus}>
      <MantineNumberInput
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
          let key: "ArrowUp" | "ArrowDown" | null = null
          if (focus && event.deltaY < -SCROLL_SENSITIVITY) key = "ArrowUp"
          else if (focus && event.deltaY > SCROLL_SENSITIVITY) key = "ArrowDown"

          if (key) {
            event.currentTarget.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }))
            event.currentTarget.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }))
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
