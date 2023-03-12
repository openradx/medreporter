import { Collapse, Stack, Switch } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface FindingInputProps {
  label?: string
  extras?: ReactNode
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  children: ReactNode
}

export const FindingInput = ({
  label,
  extras,
  value,
  onChange,
  disabled,
  children,
}: FindingInputProps) => (
  <Stack>
    <Switch
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      checked={value}
      onChange={(ev) => {
        onChange(ev.currentTarget.checked)
      }}
      disabled={disabled === true}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "36px",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    />
    <Collapse in={value}>{children}</Collapse>
  </Stack>
)
