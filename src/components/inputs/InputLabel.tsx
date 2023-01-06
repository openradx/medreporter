import { Group, Text } from "@mantine/core"
import { ReactNode } from "react"

interface InputLabelProps {
  label?: string
  extras?: ReactNode
}

export const InputLabel = ({ label, extras }: InputLabelProps) => (
  <Group sx={{ alignContent: "center", flexWrap: "nowrap", width: "100%" }} spacing={2}>
    <Text
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "calc(100% - 20px)",
        flexGrow: 1,
      }}
    >
      {label}
    </Text>
    {extras}
  </Group>
)
