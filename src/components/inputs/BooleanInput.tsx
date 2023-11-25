import { Switch, Box } from "@mantine/core"
import { ReactNode } from "react"
import classes from "./BooleanInput.module.css"
import { InputLabel } from "./InputLabel"

interface BinaryInputProps {
  label?: string
  extras?: ReactNode
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const BooleanInput = ({ label, extras, value, onChange, disabled }: BinaryInputProps) => (
  <Box className={classes.root} mt={24.8}>
    <Switch
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      checked={value}
      onChange={(ev) => {
        onChange(ev.currentTarget.checked)
      }}
      disabled={disabled === true}
      h={36}
      pl={12}
      pr={12}
      display="flex"
      style={{
        alignItems: "center",
      }}
    />
  </Box>
)
