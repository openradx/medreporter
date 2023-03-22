import { Box, Collapse, Stack, Switch } from "@mantine/core"
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
  <Stack
    sx={(theme) => ({
      flexBasis: "100%",
      border: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
      borderRadius: "4px",
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
    <Collapse in={value}>
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
    </Collapse>
  </Stack>
)
