import { Box, Group } from "@mantine/core"
import { ReactNode } from "react"

interface InputLabelProps {
  label?: string
  extras?: ReactNode
}

export const InputLabel = ({ label, extras }: InputLabelProps) => (
  <Group w="100%" wrap="nowrap" gap={2}>
    <Box
      component="span"
      w="calc(100% - 20px)"
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        flexGrow: 1,
      }}
    >
      {label}
    </Box>
    {extras}
  </Group>
)
