import { Switch, Box } from "@mantine/core"
import { ReactNode } from "react"
import { InputLabel } from "./InputLabel"

interface BinaryInputProps {
  label?: string
  extras?: ReactNode
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const BinaryInput = ({ label, extras, value, onChange, disabled }: BinaryInputProps) => (
  <Box
    sx={(theme) => ({
      border: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
      }`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      transition: "border-color 100ms ease",
      borderRadius: "4px",
      marginTop: "24.8px",
    })}
  >
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
  </Box>
)