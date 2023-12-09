import { Box, Collapse, Stack, Switch } from "@mantine/core"
import { ReactNode } from "react"
import classes from "./FindingInput.module.css"
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
  <Stack className={classes.root} my={4} gap={0}>
    <Switch
      classNames={{ body: classes.body }}
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      checked={value}
      onChange={(ev) => {
        onChange(ev.currentTarget.checked)
      }}
      disabled={disabled === true}
      h={36}
      px={12}
      display="flex"
      style={{
        alignItems: "center",
      }}
    />
    <Collapse in={value}>
      <Box p="sm">{children}</Box>
    </Collapse>
  </Stack>
)
