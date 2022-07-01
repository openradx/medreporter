import { Stack } from "@mantine/core"
import { ReactNode } from "react"

interface HintsProps {
  children: ReactNode
}

export const Hints = ({ children }: HintsProps) => (
  <Stack spacing="xs" sx={{ alignItems: "flex-start" }}>
    {children}
  </Stack>
)
